// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from 'electron';
import { ZomeCallUnsignedNapi } from 'hc-launcher-rust-utils';

contextBridge.exposeInMainWorld('electronAPI', {
  getInstalledApps: () => ipcRenderer.invoke('get-installed-apps'),
  getAppPort: () => ipcRenderer.invoke('get-app-port'),
  installApp: (filePath: string, appId: string, networkSeed?: string) =>
    ipcRenderer.invoke('install-app', filePath, appId, networkSeed),
  ipcHandlersReady: () => ipcRenderer.invoke('ipc-handlers-ready'),
  lairSetupRequired: () => ipcRenderer.invoke('lair-setup-required'),
  launch: (password: string) => ipcRenderer.invoke('launch', password),
  openApp: (appId: string) => ipcRenderer.invoke('open-app', appId),
  onHolochainReady: (callback) => ipcRenderer.on('holochain-ready', callback),
  onProgressUpdate: (callback) => ipcRenderer.on('loading-progress-update', callback),
  onIPCHandlersReady: (callback) => ipcRenderer.on('ipc-handlers-ready', callback),
  signZomeCall: (zomeCall: ZomeCallUnsignedNapi) => ipcRenderer.invoke('sign-zome-call', zomeCall),
  uninstallApp: (appId: string) => ipcRenderer.invoke('uninstall-app', appId),
});

declare global {
  interface Window {
    electronAPI: unknown;
  }
}
