<script lang="ts">
	import type { Recipe } from '$lib/data';
	import { recipeTypes, recipeTypeColors, difficultyConfig } from '$lib/data';
	import RecipeDetail from './RecipeDetail.swiftui.svelte';

	interface Props {
		recipe: Recipe;
	}

	let { recipe }: Props = $props();

	const typeColor = $derived(recipeTypeColors[recipe.type]);
	const typeLabel = $derived(recipeTypes.find(t => t.value === recipe.type)?.label || recipe.type);
	const difficulty = $derived(difficultyConfig[recipe.difficulty] || { color: "gray", icon: "star" });
</script>

<navigationlink>
	<vstack template="label" spacing="0" modifiers="background(.background);cornerRadius(12);shadow(.drop(radius: 2, x: 0, y: 1));marginBottom(16);">
		<!-- Recipe Image -->
		<asyncimage url={recipe.image} modifiers="frame(height: 200);clipped();cornerRadius(12, corners: [.topLeading, .topTrailing]);">
			<rectangle modifiers="fill(.gray.opacity(0.2));frame(height: 200);"></rectangle>
		</asyncimage>

		<!-- Recipe Content -->
		<vstack alignment="leading" spacing="8" modifiers="padding(16);">
			<!-- Recipe Type Badge -->
			<text modifiers="padding(.horizontal, 8);padding(.vertical, 4);background(.{typeColor}.opacity(0.1), in: .rect(cornerRadius: 6));font(.caption);fontWeight(.medium);foregroundColor(.{typeColor});">
				{typeLabel}
			</text>

			<hstack alignment="top">
				<vstack alignment="leading" spacing="4">
					<text modifiers="font(.headline);fontWeight(.semibold);lineLimit(2);">
						{recipe.title}
					</text>
					<text modifiers="font(.subheadline);foregroundColor(.secondary);lineLimit(2);">
						{recipe.description}
					</text>
				</vstack>
				<spacer />
				<image systemname="chevron.right" modifiers="foregroundColor(.tertiary);font(.caption);" />
			</hstack>

			<!-- Recipe Meta -->
			<hstack spacing="12" modifiers="padding(.top, 8);">
				<hstack spacing="4" modifiers="padding(.horizontal, 8);padding(.vertical, 4);background(.orange.opacity(0.1), in: .rect(cornerRadius: 6));">
					<image systemname="clock" modifiers="font(.caption);foregroundColor(.orange);" />
					<text modifiers="font(.caption);fontWeight(.medium);foregroundColor(.orange);">
						{recipe.cookTime}
					</text>
				</hstack>

				<hstack spacing="4" modifiers="padding(.horizontal, 8);padding(.vertical, 4);background(.{difficulty.color}.opacity(0.1), in: .rect(cornerRadius: 6));">
					<image systemname="{difficulty.icon}" modifiers="font(.caption);foregroundColor(.{difficulty.color});" />
					<text modifiers="font(.caption);fontWeight(.medium);foregroundColor(.{difficulty.color});">
						{recipe.difficulty}
					</text>
				</hstack>

				<spacer />
			</hstack>
		</vstack>
	</vstack>

	<group template="destination">
		<navigationtitle>{recipe.title}</navigationtitle>
		<RecipeDetail {recipe} />
	</group>
</navigationlink>