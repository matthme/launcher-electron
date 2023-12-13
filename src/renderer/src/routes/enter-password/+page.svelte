<script lang="ts">
	import { writable } from 'svelte/store';

	const passwordInput = writable('');

	const setupAndLaunch = () => {
		// Implement setup and launch logic here
	};
</script>

<div class="column center-content">
	<h3>Enter Password:</h3>
	<!-- svelte-ignore a11y-autofocus -->
	<input autofocus bind:value={$passwordInput} id="password-input" type="password" />
	<button
		on:click={setupAndLaunch}
		tabindex="0"
		style="margin-top: 30px; margin-bottom: 30px;"
		disabled={!$passwordInput}
	>
		Launch
	</button>
</div>
