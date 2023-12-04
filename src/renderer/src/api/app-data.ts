import { createQuery, useQueryClient } from '@tanstack/svelte-query';
import { PROGRESS_STATE } from '../types';

export const AppData = () => {
	const queryClient = useQueryClient();

	window.electronAPI.onProgressUpdate((e, payload) => {
		console.log('RECEIVED PROGRESS UPDATE: ', e, payload);
		queryClient.setQueryData([PROGRESS_STATE], payload);
	});

	const stateInfoResult = createQuery({
		queryKey: [PROGRESS_STATE],
		queryFn: async () => {
			const data = queryClient.getQueryData([PROGRESS_STATE]);
			if (!data) throw new Error('No data available');
			return data;
		},
		staleTime: Infinity
	});

	return {
		stateInfoResult
	};
};
