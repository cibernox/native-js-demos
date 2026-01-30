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

<!-- Full-bleed hero that breaks out of the horizontal padding -->
<vstack spacing="0" modifiers="marginBottom(24);">
	<!-- Large Hero Image with rounded corners -->
	<asyncimage url={recipe.image} modifiers="frame(height: 300);cornerRadius(16);clipped();">
		<rectangle modifiers="fill(.gray.opacity(0.3));frame(height: 300);cornerRadius(16);"></rectangle>
	</asyncimage>

	<!-- Content Card that overlaps the image -->
	<vstack alignment="leading" spacing="12" modifiers="padding(20);marginTop(-40);background(.background);cornerRadius(16);shadow(.drop(radius: 8, x: 0, y: 4));">
		<!-- Badges Row -->
		<hstack spacing="8">
			<text modifiers="padding(.horizontal, 10);padding(.vertical, 6);background(.yellow.opacity(0.15), in: .rect(cornerRadius: 8));font(.caption2);fontWeight(.bold);foregroundColor(.orange);">
				★ FEATURED
			</text>
			<text modifiers="padding(.horizontal, 10);padding(.vertical, 6);background(.{typeColor}.opacity(0.15), in: .rect(cornerRadius: 8));font(.caption);fontWeight(.semibold);foregroundColor(.{typeColor});">
				{typeLabel}
			</text>
		</hstack>

		<!-- Title - Larger and bolder -->
		<text modifiers="font(.title2);fontWeight(.bold);lineLimit(2);">
			{recipe.title}
		</text>

		<!-- Description -->
		<text modifiers="font(.body);foregroundColor(.secondary);lineLimit(3);lineSpacing(2);">
			{recipe.description}
		</text>

		<!-- Divider -->
		<rectangle modifiers="fill(.gray.opacity(0.2));frame(height: 1);padding(.vertical, 4);" />

		<!-- Meta Row -->
		<hstack spacing="0">
			<hstack spacing="6">
				<image systemname="clock.fill" modifiers="font(.subheadline);foregroundColor(.orange);" />
				<text modifiers="font(.subheadline);fontWeight(.medium);">
					{recipe.cookTime}
				</text>
			</hstack>

			<spacer />

			<rectangle modifiers="fill(.gray.opacity(0.3));frame(width: 1, height: 20);" />

			<spacer />

			<hstack spacing="6">
				<image systemname="{difficulty.icon}" modifiers="font(.subheadline);foregroundColor(.{difficulty.color});" />
				<text modifiers="font(.subheadline);fontWeight(.medium);foregroundColor(.{difficulty.color});">
					{recipe.difficulty}
				</text>
			</hstack>

			<spacer />

			<rectangle modifiers="fill(.gray.opacity(0.3));frame(width: 1, height: 20);" />

			<spacer />

			<hstack spacing="6">
				<image systemname="leaf.fill" modifiers="font(.subheadline);foregroundColor(.green);" />
				<text modifiers="font(.subheadline);fontWeight(.medium);">
					{recipe.ingredients.length} items
				</text>
			</hstack>
		</hstack>

		<!-- CTA Button - Full width -->
		<button modifiers="frame(maxWidth: .infinity);padding(.vertical, 14);background(.orange);cornerRadius(12);padding(.top, 4);">
			<hstack spacing="8">
				<text modifiers="font(.headline);fontWeight(.bold);foregroundColor(.white);">View Recipe</text>
				<image systemname="arrow.right" modifiers="font(.subheadline);fontWeight(.bold);foregroundColor(.white);" />
			</hstack>
		</button>
	</vstack>
</vstack>
