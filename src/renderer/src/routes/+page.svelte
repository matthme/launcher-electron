<script lang="ts">
	import { ProgressRadial } from '@skeletonlabs/skeleton';

	import { goto } from '$app/navigation';
	import { Error } from '$components';
	import { trpc } from '$services';

	const client = trpc();

	const lairSetupRequired = client.lairSetupRequired.createQuery();

	$: if ($lairSetupRequired.data) {
		goto('/setup-lair');
	}
</script>

{#if $lairSetupRequired.isLoading}
	<ProgressRadial />
{:else if $lairSetupRequired.error}
	<Error text="Error loading lair setup status" />
{/if}
