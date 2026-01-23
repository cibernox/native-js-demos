<script lang="ts">
	import Home from "./components/Home.swiftui.svelte";
	import About from "./components/About.swiftui.svelte";
</script>

<tabview>
	<tab title="Recipes" systemimage="fork.knife" tag="home">
		<Home />
	</tab>
	<tab title="About" systemimage="info.circle" tag="about">
		<About />
	</tab>
</tabview>