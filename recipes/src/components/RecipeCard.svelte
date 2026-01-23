<script lang="ts">
	import type { Recipe } from '$lib/data';
	import { recipeTypes } from '$lib/data';

	interface Props {
		recipe: Recipe;
	}

	let { recipe }: Props = $props();
</script>

<div class="recipe-card">
	<img
		src={recipe.image}
		alt={recipe.title}
		class="recipe-image"
		loading="lazy"
	/>
	<div class="recipe-content">
		<div class="recipe-type-badge">
			{recipeTypes.find(t => t.value === recipe.type)?.label || recipe.type}
		</div>
		<h3 class="recipe-title">{recipe.title}</h3>
		<p class="recipe-description">{recipe.description}</p>
		<div class="recipe-meta">
			<span>⏱️ {recipe.cookTime}</span>
			<span>👨‍🍳 {recipe.difficulty}</span>
		</div>
		<div class="recipe-ingredients">
			<strong>Ingredients:</strong>
			<div class="ingredient-tags">
				{#each recipe.ingredients as ingredient}
					<span class="ingredient-tag">{ingredient}</span>
				{/each}
			</div>
		</div>
	</div>
</div>