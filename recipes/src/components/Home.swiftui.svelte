<script lang="ts">
	import { recipes, appFeatures } from '$lib/data';
	import RecipeCard from './RecipeCard.swiftui.svelte';

	let searchText = $state('');

	// Filter recipes based on search
	const filteredRecipes = $derived(searchText
		? recipes.filter(recipe =>
			recipe.title.toLowerCase().includes(searchText.toLowerCase()) ||
			recipe.description.toLowerCase().includes(searchText.toLowerCase())
		)
		: recipes
	);
</script>

<navigationstack>
	<vstack spacing="0">
		<!-- Search Bar -->
		<hstack modifiers="padding(.horizontal, 16);padding(.vertical, 8);">
			<hstack spacing="8" modifiers="padding(.horizontal, 12);padding(.vertical, 8);background(.gray.opacity(0.1));cornerRadius(10);">
				<image systemname="magnifyingglass" modifiers="foregroundColor(.secondary);" />
				<textfield text="{searchText}" prompt="Search recipes..." oninput="{(e) => searchText = e.target.value}" modifiers="textFieldStyle(.plain);" />
			</hstack>
		</hstack>

		<!-- Recipe List -->
		<scrollview>
			<lazyvstack spacing="0" modifiers="padding(.horizontal, 16);">
				<!-- Featured Section Header -->
				<hstack modifiers="padding(.vertical, 16);">
					<vstack alignment="leading" spacing="4">
						<text modifiers="font(.title2);fontWeight(.bold);">Featured Recipes</text>
						<text modifiers="font(.subheadline);foregroundColor(.secondary);">Handpicked just for you</text>
					</vstack>
					<spacer />
				</hstack>

				<!-- Recipe Cards -->
				{#each filteredRecipes as recipe}
					<RecipeCard {recipe} />
				{/each}

				<!-- Quick Tips Section -->
				<vstack alignment="leading" spacing="16" modifiers="padding(.vertical, 20);">
					<text modifiers="font(.title2);fontWeight(.bold);">Quick Tips</text>

					{#each appFeatures as feature}
						<hstack spacing="12" modifiers="padding(16);background(.gray.opacity(0.05));cornerRadius(12);">
							<text modifiers="font(.title3);">{feature.icon}</text>
							<vstack alignment="leading" spacing="4">
								<text modifiers="font(.subheadline);fontWeight(.semibold);">
									{feature.title}
								</text>
								<text modifiers="font(.caption);foregroundColor(.secondary);">
									{feature.description}
								</text>
							</vstack>
							<spacer />
						</hstack>
					{/each}
				</vstack>

				<!-- Bottom padding -->
				<spacer modifiers="frame(height: 20);" />
			</lazyvstack>
		</scrollview>
	</vstack>

	<navigationtitle modifiers="displayMode(.large);">Recipe Hub</navigationtitle>
</navigationstack>