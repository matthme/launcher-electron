import { contextBridge, ipcRenderer, type IpcRendererEvent } from 'electron';
import type { ZomeCallUnsignedNapi } from 'hc-launcher-rust-utils';
import { ELECTRON_API, IPC_EVENTS } from '../types/electron-actions';

const contextBridgeApi = {
  getInstalledApps: () => ipcRenderer.invoke(IPC_EVENTS.GET_INSTALLED_APPS),
  getAppPort: () => ipcRenderer.invoke(IPC_EVENTS.GET_APP_PORT),
  installApp: (filePath: string, appId: string, networkSeed?: string) =>
    ipcRenderer.invoke(IPC_EVENTS.INSTALL_APP, filePath, appId, networkSeed),
  ipcHandlersReady: () => ipcRenderer.invoke(IPC_EVENTS.IPC_HANDLERS_READY),
  lairSetupRequired: () => ipcRenderer.invoke(IPC_EVENTS.LAIR_SETUP_REQUIRED),
  launch: (password: string) => ipcRenderer.invoke(IPC_EVENTS.LAUNCH, password),
  openApp: (appId: string) => ipcRenderer.invoke(IPC_EVENTS.OPEN_APP, appId),
  onHolochainReady: (callback: (event: IpcRendererEvent, ...args: any[]) => void) =>
    ipcRenderer.on(IPC_EVENTS.HOLOCHAIN_READY, callback),
  onProgressUpdate: (callback: (event: IpcRendererEvent, ...args: any[]) => void) =>
    ipcRenderer.on(IPC_EVENTS.LOADING_PROGRESS_UPDATE, callback),
  onIPCHandlersReady: (callback: (event: IpcRendererEvent, ...args: any[]) => void) =>
    ipcRenderer.on(IPC_EVENTS.IPC_HANDLERS_READY, callback),
  signZomeCall: (zomeCall: ZomeCallUnsignedNapi) =>
    ipcRenderer.invoke(IPC_EVENTS.SIGN_ZOME_CALL, zomeCall),
  uninstallApp: (appId: string) => ipcRenderer.invoke(IPC_EVENTS.UNINSTALL_APP, appId),
};

export type ContextBridgeApi = typeof contextBridgeApi;

contextBridge.exposeInMainWorld(ELECTRON_API, contextBridgeApi);
