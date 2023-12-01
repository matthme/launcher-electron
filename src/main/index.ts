/* eslint-disable @typescript-eslint/no-var-requires */
import { app, BrowserWindow, ipcMain, IpcMainInvokeEvent, Tray, Menu, nativeImage } from 'electron';
import path from 'path';
import * as childProcess from 'child_process';
import { ArgumentParser } from 'argparse';

import { LauncherFileSystem } from './filesystem';
import { holochianBinaries, lairBinary } from './binaries';
import { ZomeCallSigner, ZomeCallUnsignedNapi } from 'hc-launcher-rust-utils';
// import { AdminWebsocket } from '@holochain/client';
import { initializeLairKeystore, launchLairKeystore } from './lairKeystore';
import { LauncherEmitter } from './launcherEmitter';
import { HolochainManager } from './holochainManager';
import { setupLogs } from './logs';
import { DEFAULT_APPS_DIRECTORY, ICONS_DIRECTORY } from './paths';
import { createHappWindow, createOrShowMainWindow } from './windows';
import { IPC_EVENTS } from '../types';

const rustUtils = require('hc-launcher-rust-utils');
// import * as rustUtils from 'hc-launcher-rust-utils';

const appName = app.getName();

if (process.env.NODE_ENV === 'development') {
  console.log('APP IS RUN IN DEVELOPMENT MODE');
  app.setName(appName + '-dev');
}

console.log('APP PATH: ', app.getAppPath());
console.log('RUNNING ON PLATFORM: ', process.platform);

const parser = new ArgumentParser({
  description: 'Holochain Launcher',
});
parser.add_argument('-p', '--profile', {
  help: 'Opens the launcher with a custom profile instead of the default profile.',
  type: 'string',
});

const allowedProfilePattern = /^[0-9a-zA-Z-]+$/;
const args = parser.parse_args();
if (args.profile && !allowedProfilePattern.test(args.profile)) {
  throw new Error(
    'The --profile argument may only contain digits (0-9), letters (a-z,A-Z) and dashes (-)',
  );
}

const isFirstInstance = app.requestSingleInstanceLock();

if (!isFirstInstance) {
  app.quit();
}

app.on('second-instance', () => {
  MAIN_WINDOW = createOrShowMainWindow(MAIN_WINDOW);
});

const LAUNCHER_FILE_SYSTEM = LauncherFileSystem.connect(app, args.profile);
const LAUNCHER_EMITTER = new LauncherEmitter();

setupLogs(LAUNCHER_EMITTER, LAUNCHER_FILE_SYSTEM);

let ZOME_CALL_SIGNER: ZomeCallSigner | undefined;
// let ADMIN_WEBSOCKET: AdminWebsocket | undefined;
// let ADMIN_PORT: number | undefined;
let APP_PORT: number | undefined;
let HOLOCHAIN_MANAGER: HolochainManager | undefined;
let LAIR_HANDLE: childProcess.ChildProcessWithoutNullStreams | undefined;
let MAIN_WINDOW: BrowserWindow | undefined | null;

const handleSignZomeCall = (_e: IpcMainInvokeEvent, zomeCall: ZomeCallUnsignedNapi) => {
  if (!ZOME_CALL_SIGNER) throw Error('Lair signer is not ready');
  return ZOME_CALL_SIGNER.signZomeCall(zomeCall);
};

// // Handle creating/removing shortcuts on Windows when installing/uninstalling.
// if (require('electron-squirrel-startup')) {
//   app.quit();
// }

let tray;
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(async () => {
  console.log('BEING RUN IN __dirnmane: ', __dirname);
  const icon = nativeImage.createFromPath(path.join(ICONS_DIRECTORY, '16x16.png'));
  tray = new Tray(icon);

  MAIN_WINDOW = createOrShowMainWindow(MAIN_WINDOW);

  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Open',
      type: 'normal',
      click() {
        MAIN_WINDOW = createOrShowMainWindow(MAIN_WINDOW);
      },
    },
    {
      label: 'Quit',
      type: 'normal',
      click() {
        app.quit();
      },
    },
  ]);

  tray.setToolTip('Holochain Launcher');
  tray.setContextMenu(contextMenu);

  ipcMain.handle(IPC_EVENTS.SIGN_ZOME_CALL, handleSignZomeCall);
  ipcMain.handle(IPC_EVENTS.OPEN_APP, async (_e, appId: string) =>
    createHappWindow(appId, LAUNCHER_FILE_SYSTEM, APP_PORT),
  );
  ipcMain.handle(
    IPC_EVENTS.INSTALL_APP,
    async (_e, filePath: string, appId: string, networkSeed: string) => {
      if (filePath === '#####REQUESTED_KANDO_INSTALLATION#####') {
        console.log('Got request to install KanDo.');
        filePath = path.join(DEFAULT_APPS_DIRECTORY, 'kando.webhapp');
      }
      if (!appId || appId === '') {
        throw new Error('No app id provided.');
      }
      await HOLOCHAIN_MANAGER!.installApp(filePath, appId, networkSeed);
    },
  );
  ipcMain.handle(IPC_EVENTS.UNINSTALL_APP, async (_e, appId: string) => {
    await HOLOCHAIN_MANAGER!.uninstallApp(appId);
  });
  ipcMain.handle(IPC_EVENTS.GET_INSTALLED_APPS, async () => {
    return HOLOCHAIN_MANAGER!.installedApps;
  });
  ipcMain.handle(IPC_EVENTS.GET_APP_PORT, async () => {
    return HOLOCHAIN_MANAGER!.appPort;
  });
  ipcMain.handle(IPC_EVENTS.LAIR_SETUP_REQUIRED, async () => {
    return !LAUNCHER_FILE_SYSTEM.keystoreInitialized();
  });
  ipcMain.handle(IPC_EVENTS.LAUNCH, handleLaunch());
  ipcMain.handle(IPC_EVENTS.IPC_HANDLERS_READY, () => true);

  MAIN_WINDOW!.webContents.send(IPC_EVENTS.IPC_HANDLERS_READY);
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  // if (process.platform !== 'darwin') {
  //   app.quit();
  // }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createOrShowMainWindow(MAIN_WINDOW);
  }
});

// app.on('will-quit', (e: Event) => {
//   // let the launcher run in the background (systray)
//   // e.preventDefault();
// })

app.on('quit', () => {
  if (LAIR_HANDLE) {
    LAIR_HANDLE.kill();
  }
  if (HOLOCHAIN_MANAGER) {
    HOLOCHAIN_MANAGER.processHandle.kill();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

function handleLaunch() {
  return async (_e, password) => {
    if (!MAIN_WINDOW) throw new Error('Main window needs to exist before launching.');

    // const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    // await delay(5000);

    // Initialize lair if necessary
    const lairHandleTemp = childProcess.spawnSync(lairBinary, ['--version']);
    if (!lairHandleTemp.stdout) {
      console.error(`Failed to run lair-keystore binary:\n${lairHandleTemp}`);
    }
    console.log(`Got lair version ${lairHandleTemp.stdout.toString()}`);
    if (!LAUNCHER_FILE_SYSTEM.keystoreInitialized()) {
      MAIN_WINDOW.webContents.send('loading-progress-update', 'Starting lair keystore...');
      // TODO: https://github.com/holochain/launcher/issues/144
      // const lairHandle = childProcess.spawn(lairBinary, ["init", "-p"], { cwd: launcherFileSystem.keystoreDir });
      // lairHandle.stdin.write(password);
      // lairHandle.stdin.end();
      // lairHandle.stdout.pipe(split()).on("data", (line: string) => {
      //   console.log("[LAIR INIT]: ", line);
      // })
      await initializeLairKeystore(
        lairBinary,
        LAUNCHER_FILE_SYSTEM.keystoreDir,
        LAUNCHER_EMITTER,
        password,
      );
    }
    MAIN_WINDOW.webContents.send('loading-progress-update', 'Starting lair keystore...');

    // launch lair keystore
    const [lairHandle, lairUrl] = await launchLairKeystore(
      lairBinary,
      LAUNCHER_FILE_SYSTEM.keystoreDir,
      LAUNCHER_EMITTER,
      password,
    );
    LAIR_HANDLE = lairHandle;
    // create zome call signer
    ZOME_CALL_SIGNER = await rustUtils.ZomeCallSigner.connect(lairUrl, password);

    MAIN_WINDOW.webContents.send('loading-progress-update', 'Starting Holochain...');

    // launch holochain
    const holochainManager = await HolochainManager.launch(
      LAUNCHER_EMITTER,
      LAUNCHER_FILE_SYSTEM,
      holochianBinaries['holochain-0.2.3'],
      password,
      '0.2.3',
      LAUNCHER_FILE_SYSTEM.holochainDir,
      LAUNCHER_FILE_SYSTEM.conductorConfigPath,
      lairUrl,
      'https://bootstrap.holo.host',
      'wss://signal.holo.host',
    );
    // ADMIN_PORT = holochainManager.adminPort;
    // ADMIN_WEBSOCKET = holochainManager.adminWebsocket;
    APP_PORT = holochainManager.appPort;
    HOLOCHAIN_MANAGER = holochainManager;

    MAIN_WINDOW.webContents.send('holochain-ready');

    // Install default apps if necessary:
    // if (
    //   !HOLOCHAIN_MANAGER.installedApps.map((appInfo) => appInfo.installed_app_id).includes('KanDo')
    // ) {
    //   console.log('Installing default app KanDo...');
    //   await HOLOCHAIN_MANAGER.installApp(
    //     path.join(DEFAULT_APPS_DIRECTORY, 'kando.webhapp'),
    //     'KanDo',
    //     'launcher-electron-prototype',
    //   );
    //   console.log('KanDo isntalled.');
    // }
  };
}
