// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from 'electron';
import { ZomeCallUnsignedNapi } from 'hc-launcher-rust-utils';
import { ExtendedAppInfo, RunningHolochain } from '../main/sharedTypes';
import { ElectronAPI } from '../main/sharedTypes';

const electronAPI: ElectronAPI = {
  getInstalledApps: () => ipcRenderer.invoke('get-installed-apps'),
  installApp: (filePath: string, appId: string, partition: string, networkSeed?: string) =>
    ipcRenderer.invoke('install-app', filePath, appId, partition, networkSeed),
  ipcHandlersReady: () => ipcRenderer.invoke('ipc-handlers-ready'),
  lairSetupRequired: () => ipcRenderer.invoke('lair-setup-required'),
  launch: (password: string) => ipcRenderer.invoke('launch', password),
  openApp: (extendedAppInfo: ExtendedAppInfo) => ipcRenderer.invoke('open-app', extendedAppInfo),
  onHolochainReady: (
    callback: (e: Electron.IpcRendererEvent, payload: RunningHolochain[]) => any,
  ) => ipcRenderer.on('holochain-ready', callback),
  onProgressUpdate: (callback) => ipcRenderer.on('loading-progress-update', callback),
  onIPCHandlersReady: (callback) => ipcRenderer.on('ipc-handlers-ready', callback),
  signZomeCall: (zomeCall: ZomeCallUnsignedNapi) => ipcRenderer.invoke('sign-zome-call', zomeCall),
  uninstallApp: (appId: string, partition: string) =>
    ipcRenderer.invoke('uninstall-app', appId, partition),
};

contextBridge.exposeInMainWorld('electronAPI', electronAPI);

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}
