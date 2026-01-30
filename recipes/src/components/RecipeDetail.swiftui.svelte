<script lang="ts">
	import type { Recipe } from '$lib/data';
	import { recipeTypes, recipeTypeColors, difficultyConfig } from '$lib/data';

	interface Props {
		recipe: Recipe;
	}

	let { recipe }: Props = $props();

	const typeColor = $derived(recipeTypeColors[recipe.type]);
	const typeLabel = $derived(recipeTypes.find(t => t.value === recipe.type)?.label || recipe.type);
	const difficulty = $derived(difficultyConfig[recipe.difficulty] || { color: "gray", icon: "star" });
</script>

<scrollview>
	<vstack spacing="0">
		<!-- Hero Image -->
		<asyncimage url={recipe.image} modifiers="frame(height: 300);clipped();">
			<rectangle modifiers="fill(.gray.opacity(0.3));frame(height: 300);"></rectangle>
		</asyncimage>

		<!-- Content -->
		<vstack alignment="leading" spacing="20" modifiers="padding(20);">
			<!-- Type Badge -->
			<text modifiers="padding(.horizontal, 12);padding(.vertical, 6);background(.{typeColor}.opacity(0.15), in: .rect(cornerRadius: 8));font(.subheadline);fontWeight(.semibold);foregroundColor(.{typeColor});">
				{typeLabel}
			</text>

			<!-- Title -->
			<text modifiers="font(.largeTitle);fontWeight(.bold);">
				{recipe.title}
			</text>

			<!-- Description -->
			<text modifiers="font(.body);foregroundColor(.secondary);lineSpacing(4);">
				{recipe.description}
			</text>

			<!-- Meta Info -->
			<hstack spacing="24" modifiers="padding(.vertical, 8);">
				<vstack spacing="4">
					<image systemname="clock.fill" modifiers="font(.title2);foregroundColor(.orange);" />
					<text modifiers="font(.headline);fontWeight(.semibold);">{recipe.cookTime}</text>
					<text modifiers="font(.caption);foregroundColor(.secondary);">Cook Time</text>
				</vstack>

				<vstack spacing="4">
					<image systemname="{difficulty.icon}" modifiers="font(.title2);foregroundColor(.{difficulty.color});" />
					<text modifiers="font(.headline);fontWeight(.semibold);">{recipe.difficulty}</text>
					<text modifiers="font(.caption);foregroundColor(.secondary);">Difficulty</text>
				</vstack>

				<vstack spacing="4">
					<image systemname="leaf.fill" modifiers="font(.title2);foregroundColor(.green);" />
					<text modifiers="font(.headline);fontWeight(.semibold);">{recipe.ingredients.length}</text>
					<text modifiers="font(.caption);foregroundColor(.secondary);">Ingredients</text>
				</vstack>
			</hstack>

			<!-- Divider -->
			<rectangle modifiers="fill(.gray.opacity(0.2));frame(height: 1);" />

			<!-- Ingredients Section -->
			<vstack alignment="leading" spacing="12">
				<text modifiers="font(.title2);fontWeight(.bold);">Ingredients</text>

				{#each recipe.ingredients as ingredient, i}
					<hstack spacing="12">
						<text modifiers="frame(width: 24, height: 24);background(.{typeColor}.opacity(0.15), in: .circle);font(.caption);fontWeight(.semibold);foregroundColor(.{typeColor});">
							{i + 1}
						</text>
						<text modifiers="font(.body);">{ingredient}</text>
					</hstack>
				{/each}
			</vstack>

			<!-- Divider -->
			<rectangle modifiers="fill(.gray.opacity(0.2));frame(height: 1);" />

			<!-- Instructions Section -->
			<vstack alignment="leading" spacing="16">
				<text modifiers="font(.title2);fontWeight(.bold);">Instructions</text>

				<text modifiers="font(.body);lineSpacing(6);">{recipe.instructions}</text>
			</vstack>

			<!-- Bottom padding -->
			<spacer modifiers="frame(height: 40);" />
		</vstack>
	</vstack>
</scrollview>
