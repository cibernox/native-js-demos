import type { Recipe, RecipeType } from './data';

export interface RecipeFilters {
	searchText: string;
	ingredientSearch: string;
	selectedType: RecipeType | 'all';
}

export interface FilteredRecipeResult {
	recipes: Recipe[];
	totalCount: number;
	counts: {
		all: number;
		appetizer: number;
		'main-course': number;
		dessert: number;
		drink: number;
	};
}

/**
 * Filters recipes based on search criteria
 * Reusable across web and native implementations
 */
export function filterRecipes(
	recipes: Recipe[],
	filters: RecipeFilters
): FilteredRecipeResult {
	let filteredRecipes = [...recipes];

	// Text search in title and description
	if (filters.searchText.trim()) {
		const searchLower = filters.searchText.toLowerCase();
		filteredRecipes = filteredRecipes.filter(recipe =>
			recipe.title.toLowerCase().includes(searchLower) ||
			recipe.description.toLowerCase().includes(searchLower)
		);
	}

	// Ingredient search
	if (filters.ingredientSearch.trim()) {
		const ingredientLower = filters.ingredientSearch.toLowerCase();
		filteredRecipes = filteredRecipes.filter(recipe =>
			recipe.ingredients.some(ingredient =>
				ingredient.toLowerCase().includes(ingredientLower)
			)
		);
	}

	// Type filter
	if (filters.selectedType !== 'all') {
		filteredRecipes = filteredRecipes.filter(recipe =>
			recipe.type === filters.selectedType
		);
	}

	// Calculate counts for all categories (before type filtering for accurate counts)
	let countBaseRecipes = [...recipes];

	// Apply text and ingredient filters for counts
	if (filters.searchText.trim()) {
		const searchLower = filters.searchText.toLowerCase();
		countBaseRecipes = countBaseRecipes.filter(recipe =>
			recipe.title.toLowerCase().includes(searchLower) ||
			recipe.description.toLowerCase().includes(searchLower)
		);
	}

	if (filters.ingredientSearch.trim()) {
		const ingredientLower = filters.ingredientSearch.toLowerCase();
		countBaseRecipes = countBaseRecipes.filter(recipe =>
			recipe.ingredients.some(ingredient =>
				ingredient.toLowerCase().includes(ingredientLower)
			)
		);
	}

	const counts = {
		all: countBaseRecipes.length,
		appetizer: countBaseRecipes.filter(r => r.type === 'appetizer').length,
		'main-course': countBaseRecipes.filter(r => r.type === 'main-course').length,
		dessert: countBaseRecipes.filter(r => r.type === 'dessert').length,
		drink: countBaseRecipes.filter(r => r.type === 'drink').length,
	};

	return {
		recipes: filteredRecipes,
		totalCount: filteredRecipes.length,
		counts
	};
}

/**
 * Gets all unique ingredients from recipes for autocomplete
 */
export function getAllIngredients(recipes: Recipe[]): string[] {
	const ingredientSet = new Set<string>();

	recipes.forEach(recipe => {
		recipe.ingredients.forEach(ingredient => {
			ingredientSet.add(ingredient.toLowerCase());
		});
	});

	return Array.from(ingredientSet).sort();
}

/**
 * Suggests ingredients based on partial input
 */
export function suggestIngredients(
	recipes: Recipe[],
	partialIngredient: string,
	limit = 10
): string[] {
	if (!partialIngredient.trim()) return [];

	const allIngredients = getAllIngredients(recipes);
	const partial = partialIngredient.toLowerCase();

	return allIngredients
		.filter(ingredient => ingredient.includes(partial))
		.slice(0, limit);
}