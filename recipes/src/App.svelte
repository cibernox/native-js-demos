<script lang="ts">
	import Header from "$lib/Header.svelte";
	import Home from "./components/Home.svelte";
	import About from "./components/About.svelte";
	import { currentPage } from "./lib/stores/current-page";
</script>

<svelte:head>
	<title>Recipes App</title>
</svelte:head>

<main>
	<Header />

	{#if $currentPage === 'home'}
		<Home />
	{:else if $currentPage === 'about'}
		<About />
	{:else}
		<Home />
	{/if}
</main>