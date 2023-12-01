import { languageEN, languageStore } from '$utils';
import { localStorageStore } from '@skeletonlabs/skeleton';
import type { Writable } from 'svelte/store';

export const languageStoreInstance: Writable<string> = localStorageStore(languageStore, languageEN);
