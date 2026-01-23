<script lang="ts">
	import { recipes, appFeatures } from '$lib/data';
</script>

<div class="hero">
	<h1>Welcome to Recipe Hub</h1>
	<p>Discover amazing recipes from around the world</p>
</div>

<div class="card">
	<h2>✨ Featured Recipes</h2>
	<p>Handpicked recipes that are perfect for any occasion. From quick weekday meals to impressive dinner party dishes.</p>
</div>

<div class="recipe-grid">
	{#each recipes as recipe}
		<div class="recipe-card">
			<img
				src={recipe.image}
				alt={recipe.title}
				class="recipe-image"
				loading="lazy"
			/>
			<div class="recipe-content">
				<h3 class="recipe-title">{recipe.title}</h3>
				<p class="recipe-description">{recipe.description}</p>
				<div class="recipe-meta">
					<span>⏱️ {recipe.cookTime}</span>
					<span>👨‍🍳 {recipe.difficulty}</span>
				</div>
			</div>
		</div>
	{/each}
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