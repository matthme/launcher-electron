<script>
	export let text = '';
</script>

<div class="group relative cursor-pointer">
	<slot />
	<span
		class="invisible absolute bottom-full left-1/2 z-10 -translate-x-1/2 transform rounded-md bg-gray-700 px-3 py-1 text-sm text-white opacity-0 transition-opacity group-hover:visible group-hover:opacity-100"
	>
		{text}
	</span>
</div>
