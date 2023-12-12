import { localStorageStore } from '@skeletonlabs/skeleton';
import type { Writable } from 'svelte/store';

import { languageEN, languageStore } from '$utils';

export const languageStoreInstance: Writable<string> = localStorageStore(languageStore, languageEN);
