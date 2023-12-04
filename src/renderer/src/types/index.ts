import type { ContextBridgeApi } from '../../../preload/admin';
export * from './query';

declare global {
	interface Window {
		electronAPI: ContextBridgeApi;
	}
}
