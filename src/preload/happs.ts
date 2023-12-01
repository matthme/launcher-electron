import { contextBridge, ipcRenderer } from 'electron';
import { ELECTRON_API, IPC_EVENTS } from '../types/electron-actions';
import { ZomeCallUnsignedNapi } from 'hc-launcher-rust-utils';

const contextBridgeApi = {
  signZomeCall: (zomeCall: ZomeCallUnsignedNapi) =>
    ipcRenderer.invoke(IPC_EVENTS.SIGN_ZOME_CALL, zomeCall),
};

export type ContextBridgeApi = typeof contextBridgeApi;

contextBridge.exposeInMainWorld(ELECTRON_API, contextBridgeApi);
