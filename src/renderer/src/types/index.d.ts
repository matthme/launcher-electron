import { ContextBridgeApi } from '../../../preload/admin';
import { ELECTRON_API } from '../../../types/electron-actions';

declare global {
	interface Window {
		[ELECTRON_API]: ContextBridgeApi;
	}
}

export {};
