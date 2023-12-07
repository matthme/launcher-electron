import { ipcLink } from 'electron-trpc/renderer';
import type { AppRouter } from '../../../main';
import { createTRPCProxyClient } from '@trpc/client';
import type { QueryClient } from '@tanstack/svelte-query';

import { svelteQueryWrapper } from 'trpc-svelte-query-adapter';

const client = createTRPCProxyClient<AppRouter>({
	links: [ipcLink()]
});

export function trpc(queryClient?: QueryClient) {
	return svelteQueryWrapper<AppRouter>({
		client,
		queryClient
	});
}
