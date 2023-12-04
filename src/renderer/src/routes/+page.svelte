<script lang="ts">
	import { trpc } from '$lib/clients';

	// import { get } from 'svelte/store';
	import { languageStoreInstance } from '$services';
	import { languageEN } from '$utils';
	// import Tooltip from '$components/Tooltip.svelte';

	const client = trpc();

	const foo = client.greeting.createQuery({ data: 'test' });

	client.greetingSubscription.createSubscription(undefined, {
		onData: (data) => {
			console.log(data);
		},
		onError: (error) => {
			console.log(error);
		}
	});

	languageStoreInstance.set(languageEN);
</script>

<div class="container h-full mx-auto flex justify-center items-center">
	<!-- {#if $query.isLoading}
		<section class="card w-full">
			<div class="p-4 space-y-4">
				<div class="placeholder" />
				<div class="grid grid-cols-3 gap-8">
					<div class="placeholder" />
					<div class="placeholder" />
					<div class="placeholder" />
				</div>
				<div class="grid grid-cols-4 gap-4">
					<div class="placeholder" />
					<div class="placeholder" />
					<div class="placeholder" />
					<div class="placeholder" />
				</div>
			</div>
		</section>
	{:else if $query.error}
		An error has occurred:
		{$query.error}
	{:else}
		<div class="space-y-10 text-center flex flex-col items-center">
			<h1 class="h1">Welcome to Holochain Launcher.</h1>
			<h2>Version: ${$query.data}</h2>
			<h2>Language: {get(languageStoreInstance)}</h2>

			<Tooltip text="This is a custom tooltip for SvelteKit!">Hover over me</Tooltip>

			<button type="button" class="btn variant-filled">
				<span>Button</span>
			</button>
		</div>
	{/if} -->
	<span>{$foo.error}</span>
</div>
