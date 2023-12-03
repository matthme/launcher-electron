import type { ContextBridgeApi } from '../../../preload/admin';
import { ELECTRON_API } from '../../../types/electron-actions';
export * from './query';

declare global {
	interface Window {
		[ELECTRON_API]: ContextBridgeApi;
	}
}
