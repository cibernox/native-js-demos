<script lang="ts">
  import { currentPage } from "$lib/stores/current-page";
</script>
<vstack spacing="0" modifiers="background(.background);shadow(.drop(radius: 2, x: 0, y: 1));">
	<!-- Header Content -->
	<vstack spacing="16" modifiers="padding(.horizontal, 20);padding(.vertical, 20);">
		<!-- App Title -->
		<text modifiers="font(.title);fontWeight(.bold);foregroundColor(.primary);">
			Recipes App
		</text>

		<!-- Navigation Buttons -->
		<hstack spacing="12">
			<button onclick={() => $currentPage = 'home'} modifiers="padding(.horizontal, 16);padding(.vertical, 8);background(.blue);cornerRadius(8);">
				<text modifiers="fontWeight(.medium);">Home</text>
			</button>

			<button onclick={() => $currentPage = 'about'} modifiers="padding(.horizontal, 16);padding(.vertical, 8);background(.blue);cornerRadius(8);">
				<text modifiers="fontWeight(.medium);">About</text>
			</button>
		</hstack>
	</vstack>

	<!-- Separator -->
	<rectangle modifiers="frame(height: 1);foregroundColor(.secondary.opacity(0.2));"></rectangle>
</vstack>