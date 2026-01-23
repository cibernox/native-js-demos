<script lang="ts">
	import Header from "$lib/Header.swiftui.svelte";
	import Home from "./components/Home.swiftui.svelte";
	import About from "./components/About.swiftui.svelte";
	import { currentPage } from "./lib/stores/current-page";
</script>

<vstack>
	<Header />

	{#if $currentPage === 'home'}
		<Home />
	{:else if $currentPage === 'about'}
		<About />
	{:else}
		<Home />
	{/if}
</vstack>