<script lang="ts">
	import { recipes, appFeatures, recipeTypes, type RecipeType } from '$lib/data';
	import { filterRecipes, suggestIngredients, type RecipeFilters } from '$lib/recipeFilters';
	import RecipeCard from './RecipeCard.svelte';

	let searchText = $state('');
	let ingredientSearch = $state('');
	let selectedType = $state<RecipeType | 'all'>('all');
	let showIngredientSuggestions = $state(false);

	// Create filters object
	const filters = $derived<RecipeFilters>({
		searchText,
		ingredientSearch,
		selectedType
	});

	// Apply filtering
	const filteredResult = $derived(filterRecipes(recipes, filters));
	const ingredientSuggestions = $derived(suggestIngredients(recipes, ingredientSearch, 8));

	function selectIngredient(ingredient: string) {
		ingredientSearch = ingredient;
		showIngredientSuggestions = false;
	}

	function clearAllFilters() {
		searchText = '';
		ingredientSearch = '';
		selectedType = 'all';
	}
	// Helper to check if any filters are active
	const hasActiveFilters = $derived(
		searchText.trim() !== '' ||
		ingredientSearch.trim() !== '' ||
		selectedType !== 'all'
	);
</script>

<div class="hero">
	<h1>Welcome to Recipe Hub</h1>
	<p>Discover amazing recipes from around the world</p>
</div>

<!-- Enhanced Search Section -->
<div class="search-section">
	<h2>🔍 Find Your Perfect Recipe</h2>

	<div class="search-controls">
		<!-- Recipe Name Search -->
		<div class="search-group">
			<label for="recipe-search">Recipe Name</label>
			<input
				id="recipe-search"
				type="text"
				placeholder="Search by recipe name..."
				bind:value={searchText}
				class="search-input"
			/>
		</div>

		<!-- Ingredient Search -->
		<div class="search-group ingredient-search">
			<label for="ingredient-search">Ingredient</label>
			<input
				id="ingredient-search"
				type="text"
				placeholder="Search by ingredient..."
				bind:value={ingredientSearch}
				onfocus={() => showIngredientSuggestions = true}
				onblur={() => setTimeout(() => showIngredientSuggestions = false, 150)}
				class="search-input"
			/>

			{#if showIngredientSuggestions && ingredientSuggestions.length > 0}
				<div class="suggestions-dropdown">
					{#each ingredientSuggestions as ingredient}
						<button
							type="button"
							class="suggestion-item"
							onclick={() => selectIngredient(ingredient)}
						>
							{ingredient}
						</button>
					{/each}
				</div>
			{/if}
		</div>

		<!-- Recipe Type Filter -->
		<div class="search-group">
			<label for="type-filter">Recipe Type</label>
			<select
				id="type-filter"
				bind:value={selectedType}
				class="search-select"
			>
				<option value="all">All Types ({filteredResult.counts.all})</option>
				{#each recipeTypes as type}
					<option value={type.value}>
						{type.label} ({filteredResult.counts[type.value]})
					</option>
				{/each}
			</select>
		</div>

		<!-- Clear Filters -->
		{#if searchText || ingredientSearch || selectedType !== 'all'}
			<button
				type="button"
				class="clear-filters-btn"
				onclick={clearAllFilters}
			>
				Clear All Filters
			</button>
		{/if}
	</div>

	<!-- Results Summary -->
	<div class="results-summary">
		<p>
			Showing <strong>{filteredResult.totalCount}</strong>
			{filteredResult.totalCount === 1 ? 'recipe' : 'recipes'}
			{#if searchText || ingredientSearch || selectedType !== 'all'}
				matching your filters
			{/if}
		</p>
	</div>
</div>

{#if !hasActiveFilters}
<div class="card">
	<h2>✨ Featured Recipes</h2>
	<p>Handpicked recipes that are perfect for any occasion. From quick weekday meals to impressive dinner party dishes.</p>
</div>
{:else}
<div class="search-results-header">
	<p>
		{#if searchText || ingredientSearch}
			Search results
		{:else}
			{recipeTypes.find(t => t.value === selectedType)?.label || 'Filtered'} recipes
		{/if}
	</p>
</div>
{/if}

<div class="recipe-grid">
	{#each filteredResult.recipes as recipe}
		<RecipeCard {recipe} />
	{/each}

	{#if filteredResult.recipes.length === 0}
		<div class="no-results">
			<h3>No recipes found</h3>
			<p>Try adjusting your filters or search terms.</p>
			<button
				type="button"
				class="reset-btn"
				onclick={clearAllFilters}
			>
				Show All Recipes
			</button>
		</div>
	{/if}
</div>

<div class="card">
	<h2>🍳 Why Choose Recipe Hub?</h2>
	<div class="feature-grid">
		{#each appFeatures as feature}
			<div class="feature-card">
				<div class="feature-icon">{feature.icon}</div>
				<h3>{feature.title}</h3>
				<p>{feature.description}</p>
			</div>
		{/each}
	</div>
</div>