<script lang="ts">
	import Header from "$lib/Header.swiftui.svelte";
	import Home from "./components/Home.swiftui.svelte";
	import { currentPage } from "./lib/stores/current-page";
</script>

<vstack spacing="0" modifiers="frame(maxWidth: .infinity, maxHeight: .infinity);background(.background);">
	<Header />

	{#if $currentPage === 'home'}
		<Home />
	{:else if $currentPage === 'about'}
	<scrollview>
		<vstack spacing="20" modifiers="padding(40);frame(maxWidth: .infinity, maxHeight: .infinity);background(.background);">
			<text modifiers="font(.largeTitle);fontWeight(.bold);foregroundColor(.primary);">
				About Page
			</text>
			<text modifiers="font(.body);foregroundColor(.secondary);multilineTextAlignment(.center);">
				SwiftUI About page coming soon!
			</text>
		</vstack>
	</scrollview>
	{:else}
		<Home />
	{/if}
</vstack>