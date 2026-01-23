<script lang="ts">
	import type { Recipe } from '$lib/data';
	import { recipeTypes } from '$lib/data';

	interface Props {
		recipe: Recipe;
	}

	let { recipe }: Props = $props();
</script>

<vstack spacing="0" modifiers="background(.background);cornerRadius(12);shadow(.drop(radius: 2, x: 0, y: 1));marginBottom(16);">
	<!-- Recipe Image -->
	<asyncimage url={recipe.image} modifiers="frame(height: 200);clipped();cornerRadius(12, corners: [.topLeading, .topTrailing]);">
		<rectangle modifiers="fill(.gray.opacity(0.2));frame(height: 200);"></rectangle>
	</asyncimage>

	<!-- Recipe Content -->
	<vstack alignment="leading" spacing="8" modifiers="padding(16);">
		<!-- Recipe Type Badge -->
		<text modifiers="padding(.horizontal, 8);padding(.vertical, 4);background(.blue.opacity(0.1));cornerRadius(6);font(.caption);fontWeight(.medium);foregroundColor(.blue);">
			{recipeTypes.find(t => t.value === recipe.type)?.label || recipe.type}
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
		</hstack>

		<!-- Recipe Meta -->
		<hstack spacing="16" modifiers="padding(.top, 8);">
			<label modifiers="padding(.horizontal, 8);padding(.vertical, 4);background(.orange.opacity(0.1));cornerRadius(6);">
				<hstack spacing="4">
					<image systemname="clock" modifiers="font(.caption);foregroundColor(.orange);" />
					<text modifiers="font(.caption);fontWeight(.medium);foregroundColor(.orange);">
						{recipe.cookTime}
					</text>
				</hstack>
			</label>

			<label modifiers="padding(.horizontal, 8);padding(.vertical, 4);background(.blue.opacity(0.1));cornerRadius(6);">
				<hstack spacing="4">
					<image systemname="star" modifiers="font(.caption);foregroundColor(.blue);" />
					<text modifiers="font(.caption);fontWeight(.medium);foregroundColor(.blue);">
						{recipe.difficulty}
					</text>
				</hstack>
			</label>

			<spacer />

			<button modifiers="padding(.horizontal, 16);padding(.vertical, 8);background(.orange);cornerRadius(8);">
				<text modifiers="font(.subheadline);fontWeight(.semibold);foregroundColor(.white);">View</text>
			</button>
		</hstack>

		<!-- Ingredients -->
		<vstack alignment="leading" spacing="8" modifiers="padding(.top, 8);">
			<text modifiers="font(.subheadline);fontWeight(.semibold);foregroundColor(.primary);">
				Ingredients:
			</text>
			<lazyvgrid columns="[GridItem(.adaptive(minimum: 80))]" spacing="8">
				{#each recipe.ingredients as ingredient}
					<text modifiers="padding(.horizontal, 8);padding(.vertical, 4);background(.gray.opacity(0.1));cornerRadius(6);font(.caption);fontWeight(.medium);foregroundColor(.secondary);multilineTextAlignment(.center);">
						{ingredient}
					</text>
				{/each}
			</lazyvgrid>
		</vstack>
	</vstack>
</vstack>