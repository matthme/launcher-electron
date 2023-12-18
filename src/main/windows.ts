import { is } from '@electron-toolkit/utils';
import { BrowserWindow, net, session } from 'electron';
import path from 'path';
import url from 'url';
import { setLinkOpenHandlers } from './utils';
import { LauncherFileSystem } from './filesystem';
import { ExtendedAppInfo } from './sharedTypes';

export const createOrShowMainWindow = (mainWindow: BrowserWindow | undefined | null) => {
  if (mainWindow) {
    mainWindow.show();
    return;
  }
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    title: 'Holochain Launcher',
    show: false,
    webPreferences: {
      preload: path.resolve(__dirname, '../preload/admin.js'),
    },
  });

  console.log('Creating main window');

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL']);
  } else {
    mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'));
  }

  // once its ready to show, show
  mainWindow.once('ready-to-show', () => {
    mainWindow!.show();
    // Open the DevTools.
    // if (is.dev) {
    //   mainWindow!.webContents.openDevTools();
    // }
  });

  setLinkOpenHandlers(mainWindow);

  console.log('Content loaded into main window.');

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
  return mainWindow;
};

export const createHappWindow = (
  // this should take extendedAppInfo instead, containing info about app, holochain version and partition
  extendedAppInfo: ExtendedAppInfo,
  launcherFileSystem: LauncherFileSystem,
  appPort: number | undefined,
): BrowserWindow => {
  // TODO create mapping between installed-app-id's and window ids
  if (!appPort) throw new Error('App port not defined.');
  const appId = extendedAppInfo.appInfo.installed_app_id;
  const partitionName = extendedAppInfo.holochainDataRoot.name;
  const browserPartition = `persist:${partitionName}#${appId}`;
  const ses = session.fromPartition(browserPartition);
  ses.protocol.handle('webhapp', async (request) => {
    // console.log("### Got file request: ", request);
    const uriWithoutProtocol = request.url.slice('webhapp://'.length);
    const filePathComponents = uriWithoutProtocol.split('/').slice(1);
    const filePath = path.join(...filePathComponents);

    console.log('filePath: ', filePath);

    const resource = net.fetch(
      url
        .pathToFileURL(
          path.join(
            launcherFileSystem.happUiDir(appId, extendedAppInfo.holochainDataRoot),
            filePath,
          ),
        )
        .toString(),
    );
    if (!filePath.endsWith('index.html')) {
      return resource;
    } else {
      const indexHtmlResponse = await resource;
      const indexHtml = await indexHtmlResponse.text();
      let modifiedContent = indexHtml.replace(
        '<head>',
        `<head><script type="module">window.__HC_LAUNCHER_ENV__ = { APP_INTERFACE_PORT: ${appPort}, INSTALLED_APP_ID: "${appId}", FRAMEWORK: "electron" };</script>`,
      );
      // remove title attribute to be able to set title to app id later
      modifiedContent = modifiedContent.replace(/<title>.*?<\/title>/i, '');
      return new Response(modifiedContent, indexHtmlResponse);
    }
  });
  // Create the browser window.
  let happWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.resolve(__dirname, '../preload/happs.js'),
      partition: browserPartition,
    },
  });

  happWindow.menuBarVisible = false;

  happWindow.setTitle(appId);

  setLinkOpenHandlers(happWindow);

  happWindow.on('closed', () => {
    console.log(`Happ window with frame id ${happWindow.id} closed.`);
    // remove protocol handler
    ses.protocol.unhandle('webhapp');
    // happWindow = null;
  });
  console.log('Loading happ window file');
  happWindow.loadURL(`webhapp://webhappwindow/index.html`);
  return happWindow;
};

// // Currently unused
// const createSplashscreenWindow = (): BrowserWindow => {
//   // Create the browser window.
//   const splashWindow = new BrowserWindow({
//     height: 450,
//     width: 800,
//     center: true,
//     resizable: false,
//     frame: false,
//     show: false,
//     backgroundColor: '#331ead',
//     // use these settings so that the ui
//     // can listen for status change events
//     webPreferences: {
//       preload: path.resolve(__dirname, '../preload/splashscreen.js'),
//     },
//   });

//   // // and load the splashscreen.html of the app.
//   // if (app.isPackaged) {
//   //   splashWindow.loadFile(SPLASH_FILE);
//   // } else {
//   //   // development
//   //   splashWindow.loadURL(`${DEVELOPMENT_UI_URL}/splashscreen.html`);
//   // }

//   if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
//     splashWindow.loadURL(`${process.env['ELECTRON_RENDERER_URL']}/splashscreen.html`);
//   } else {
//     splashWindow.loadFile(path.join(__dirname, '../renderer/splashscreen.html'));
//   }

//   // once its ready to show, show
//   splashWindow.once('ready-to-show', () => {
//     splashWindow.show();
//   });

//   // Open the DevTools.
//   // mainWindow.webContents.openDevTools();
//   return splashWindow;
// };
