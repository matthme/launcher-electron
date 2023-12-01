<script>
	export let text = '';
</script>

<div class="relative cursor-pointer group">
	<slot />
	<span
		class="absolute invisible group-hover:visible z-10 bottom-full left-1/2 transform -translate-x-1/2 px-3 py-1 bg-gray-700 text-white text-sm rounded-md transition-opacity opacity-0 group-hover:opacity-100"
	>
		{text}
	</span>
</div>
