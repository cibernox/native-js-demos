<script lang="ts">
	import { recipes, appFeatures, recipeTypes, type RecipeType } from '$lib/data';
	import { filterRecipes, type RecipeFilters } from '$lib/recipeFilters';
	import RecipeCard from './RecipeCard.swiftui.svelte';

	let searchText = $state('');
	let selectedType = $state<RecipeType | 'all'>('all');
	let showingFilters = $state(false);

	// Create filters object
	const filters = $derived<RecipeFilters>({
		searchText,
		ingredientSearch: '', // We'll handle this differently on iOS
		selectedType
	});

	// Apply filtering using the shared module
	const filteredResult = $derived(filterRecipes(recipes, filters));

	function clearFilters() {
		searchText = '';
		selectedType = 'all';
	}

	// Check if any filters are active
	const hasActiveFilters = $derived(
		searchText.trim() !== '' || selectedType !== 'all'
	);
</script>

<navigationstack>
	<navigationtitle modifiers="navigationBarTitleDisplayMode(.large);">Recipe Hub</navigationtitle>

	<scrollview>
		<lazyvstack spacing="0" modifiers="padding(.horizontal, 16);">
			<!-- Header Section -->
			{#if !hasActiveFilters}
				<vstack alignment="leading" spacing="16" modifiers="padding(.vertical, 16);">
					<vstack alignment="leading" spacing="4">
						<text modifiers="font(.title2);fontWeight(.bold);">Featured Recipes</text>
						<text modifiers="font(.subheadline);foregroundColor(.secondary);">Handpicked just for you</text>
					</vstack>
				</vstack>
			{:else}
				<vstack alignment="leading" spacing="8" modifiers="padding(.vertical, 12);">
					<text modifiers="font(.caption);foregroundColor(.secondary);textCase(.uppercase);letterSpacing(0.5);">
						{filteredResult.totalCount} {filteredResult.totalCount === 1 ? 'recipe' : 'recipes'}
						{#if selectedType !== 'all'}
							in {recipeTypes.find(t => t.value === selectedType)?.label}
						{/if}
					</text>
				</vstack>
			{/if}

			<!-- Recipe Cards -->
			{#each filteredResult.recipes as recipe}
				<RecipeCard {recipe} />
			{/each}

			<!-- No Results -->
			{#if filteredResult.recipes.length === 0}
				<vstack spacing="16" modifiers="padding(.vertical, 40);padding(.horizontal, 20);">
					<vstack spacing="8" modifiers="padding(.vertical, 24);padding(.horizontal, 24);background(.gray.opacity(0.1));cornerRadius(16);">
						<image systemname="magnifyingglass" modifiers="font(.system(size: 40));foregroundColor(.secondary);" />
						<text modifiers="font(.headline);fontWeight(.semibold);">No recipes found</text>
						<text modifiers="font(.subheadline);foregroundColor(.secondary);multilineTextAlignment(.center);">
							Try adjusting your search or filters
						</text>
					</vstack>
					<button modifiers="padding(.horizontal, 20);padding(.vertical, 12);background(.orange);cornerRadius(12);" onclick={clearFilters}>
						<text modifiers="font(.subheadline);fontWeight(.semibold);foregroundColor(.white);">Show All Recipes</text>
					</button>
				</vstack>
			{/if}

			<!-- Quick Tips Section -->
			{#if !hasActiveFilters}
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
			{/if}

			<!-- Bottom padding -->
			<spacer modifiers="frame(height: 20);" />
		</lazyvstack>
	</scrollview>

	<searchable text={searchText} prompt="Search recipes..." />

	<!-- Toolbar with Filter Button -->
	<!-- <toolbar>
		<toolbaritem placement="topBarTrailing">
			<button onclick={() => showingFilters = true}>
				<hstack spacing="4">
					<image systemname="line.3.horizontal.decrease.circle{hasActiveFilters ? '.fill' : ''}"
						   modifiers="foregroundColor({hasActiveFilters ? '.orange' : '.primary'});" />
					{#if hasActiveFilters}
						<text modifiers="font(.caption2);fontWeight(.semibold);foregroundColor(.orange);">
							{selectedType !== 'all' ? '1' : ''}
						</text>
					{/if}
				</hstack>
			</button>
		</toolbaritem>
	</toolbar> -->

	<!-- Filter Sheet -->
	<!-- <sheet modifiers="sheet(isPresented: {showingFilters});">
		<navigationstack>
			<vstack alignment="leading" spacing="20" modifiers="padding(.horizontal, 20);padding(.vertical, 20);">
				<vstack alignment="leading" spacing="12">
					<text modifiers="font(.headline);fontWeight(.semibold);">Recipe Type</text>

					<vstack spacing="1" modifiers="background(.background);cornerRadius(12);overflow(.hidden);">
						<button
							modifiers="padding(.horizontal, 16);padding(.vertical, 12);background(.background);"
							onclick={() => selectedType = 'all'}
						>
							<hstack>
								<text modifiers="font(.body);fontWeight(.medium);foregroundColor({selectedType === 'all' ? '.orange' : '.primary'});">
									All Types ({filteredResult.counts.all})
								</text>
								<spacer />
								{#if selectedType === 'all'}
									<image systemname="checkmark" modifiers="foregroundColor(.orange);" />
								{/if}
							</hstack>
						</button>

						{#each recipeTypes as type}
							<divider />
							<button
								modifiers="padding(.horizontal, 16);padding(.vertical, 12);background(.background);"
								onclick={() => selectedType = type.value}
							>
								<hstack>
									<text modifiers="font(.body);fontWeight(.medium);foregroundColor({selectedType === type.value ? '.orange' : '.primary'});">
										{type.label} ({filteredResult.counts[type.value]})
									</text>
									<spacer />
									{#if selectedType === type.value}
										<image systemname="checkmark" modifiers="foregroundColor(.orange);" />
									{/if}
								</hstack>
							</button>
						{/each}
					</vstack>
				</vstack>

				{#if hasActiveFilters}
					<button
						modifiers="padding(.horizontal, 20);padding(.vertical, 12);background(.red);cornerRadius(12);"
						onclick={() => {clearFilters(); showingFilters = false;}}
					>
						<text modifiers="font(.subheadline);fontWeight(.semibold);foregroundColor(.white);">
							Clear All Filters
						</text>
					</button>
				{/if}
			</vstack>

			<navigationtitle>Filters</navigationtitle>
			<toolbar>
				<toolbaritem placement="topBarTrailing">
					<button onclick={() => showingFilters = false}>
						<text modifiers="font(.body);fontWeight(.medium);foregroundColor(.orange);">Done</text>
					</button>
				</toolbaritem>
			</toolbar>
		</navigationstack>
	</sheet> -->
</navigationstack>