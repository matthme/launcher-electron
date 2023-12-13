<script lang="ts">
	import { writable } from 'svelte/store';

	const passwordInput = writable('');
	const confirmPasswordInput = writable('');
	const passwordsDontMatch = writable(false);

	const checkPasswords = () => {
		passwordsDontMatch.set(passwordInput !== confirmPasswordInput);
	};

	const setupAndLaunch = () => {
		// Implement setup and launch logic here
	};
</script>

<div class="column center-content">
	<h2>Setup Holochain Launcher</h2>
	<div class="max-w-500 text-center text-lg">
		Choose a password to encrypt your data and private keys. You will always need this password to
		start Launcher.
	</div>
	<h3>Select Password:</h3>
	<!-- svelte-ignore a11y-autofocus -->
	<input
		bind:value={$passwordInput}
		autofocus
		on:input={checkPasswords}
		id="password-input"
		type="password"
		class="input"
	/>
	<h3>Confirm Password:</h3>
	<input
		bind:value={$confirmPasswordInput}
		on:input={checkPasswords}
		id="confirm-password-input"
		type="password"
		class="input"
	/>
	<div class={$passwordsDontMatch ? 'input-error' : 'color-transparent'}>
		Passwords don't match!
	</div>
	<button
		on:click={setupAndLaunch}
		tabindex="0"
		class="mb-8 mt-2"
		disabled={!$passwordInput || $passwordsDontMatch}
	>
		Setup and Launch
	</button>
</div>
