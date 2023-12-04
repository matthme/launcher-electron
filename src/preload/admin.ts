import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import { exposeElectronTRPC } from 'electron-trpc/main';
import type { ZomeCallUnsignedNapi } from 'hc-launcher-rust-utils';
import { ProgressState, IPC_EVENTS } from '../types';

export type IpcEventParams = {
  'sign-zome-call': [ZomeCallUnsignedNapi];
  'open-app': [string];
  'install-app': [string, string, string?];
  'uninstall-app': [string];
  'get-installed-apps': [];
  'get-app-port': [];
  'lair-setup-required': [];
  'loading-progress-update': [ProgressState];
  launch: [string];
  'ipc-handlers-ready': [];
  'holochain-ready': [(event: IpcRendererEvent, ...args: any[]) => void];
};

const invokeIpc = <T extends IPC_EVENTS>(event: T, ...args: IpcEventParams[T]) =>
  ipcRenderer.invoke(event, ...args);

const onIpcEvent = <T extends IPC_EVENTS>(
  event: T,
  callback: (event: IpcRendererEvent, ...args: any[]) => void,
) =>
  ipcRenderer.on(event, (ipcEvent: IpcRendererEvent, ...args: any[]) =>
    callback(ipcEvent, ...args),
  );

const contextBridgeApi = {
  getInstalledApps: () => invokeIpc('get-installed-apps'),
  getAppPort: () => invokeIpc('get-app-port'),
  installApp: (filePath: string, appId: string, networkSeed?: string) =>
    invokeIpc('install-app', filePath, appId, networkSeed),
  ipcHandlersReady: () => invokeIpc('ipc-handlers-ready'),
  lairSetupRequired: () => invokeIpc('lair-setup-required'),
  launch: (password: string) => invokeIpc('launch', password),
  openApp: (appId: string) => invokeIpc('open-app', appId),
  onHolochainReady: (callback: (event: IpcRendererEvent, ...args: any[]) => void) =>
    onIpcEvent('holochain-ready', callback),
  onProgressUpdate: (callback: (event: IpcRendererEvent, progress: ProgressState) => void) =>
    onIpcEvent('loading-progress-update', callback),
  onIPCHandlersReady: (callback: (event: IpcRendererEvent, ...args: any[]) => void) =>
    onIpcEvent('ipc-handlers-ready', callback),
  signZomeCall: (zomeCall: ZomeCallUnsignedNapi) => invokeIpc('sign-zome-call', zomeCall),
  uninstallApp: (appId: string) => invokeIpc('uninstall-app', appId),
};

process.once('loaded', async () => {
  exposeElectronTRPC();
});

export type ContextBridgeApi = typeof contextBridgeApi;

contextBridge.exposeInMainWorld('electronAPI', contextBridgeApi);
