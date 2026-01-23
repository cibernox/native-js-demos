<script lang="ts">
	import { recipes, appFeatures } from '$lib/data';
</script>

<scrollview modifiers="background(.background);">
	<!-- Hero Section -->
	<vstack spacing="20" modifiers="padding(.horizontal, 20);padding(.top, 40);padding(.bottom, 30);">
		<text modifiers="font(.largeTitle);fontWeight(.bold);foregroundColor(.primary);multilineTextAlignment(.center);">
			Welcome to Recipe Hub
		</text>
		<text modifiers="font(.title2);foregroundColor(.secondary);multilineTextAlignment(.center);padding(.horizontal, 20);">
			Discover amazing recipes from around the world
		</text>
	</vstack>

	<!-- Featured Recipes Header -->
	<vstack alignment="leading" spacing="10" modifiers="padding(.horizontal, 20);padding(.bottom, 20);">
		<hstack spacing="8">
			<text>✨</text>
			<text modifiers="font(.title2);fontWeight(.semibold);foregroundColor(.primary);">
				Featured Recipes
			</text>
		</hstack>
		<text modifiers="font(.body);foregroundColor(.secondary);multilineTextAlignment(.leading);">
			Handpicked recipes that are perfect for any occasion. From quick weekday meals to impressive dinner party dishes.
		</text>
	</vstack>

	<!-- Recipe Grid -->
	<lazyvgrid columns="[GridItem(.adaptive(minimum: 300))]" spacing="16" modifiers="padding(.horizontal, 20);padding(.bottom, 30);">
		{#each recipes as recipe}
			<vstack alignment="leading" spacing="12" modifiers="background(.background);cornerRadius(16);shadow(.drop(radius: 4, x: 0, y: 2));">
				<!-- Recipe Image -->
				<asyncimage url={recipe.image} modifiers="frame(height: 200);clipped();cornerRadius(16, corners: [.topLeading, .topTrailing]);">
					<rectangle modifiers="fill(.gray.opacity(0.3));"></rectangle>
				</asyncimage>

				<!-- Recipe Content -->
				<vstack alignment="leading" spacing="8" modifiers="padding(.horizontal, 16);padding(.bottom, 16);">
					<text modifiers="font(.headline);fontWeight(.semibold);foregroundColor(.primary);lineLimit(2);">
						{recipe.title}
					</text>

					<text modifiers="font(.subheadline);foregroundColor(.secondary);lineLimit(3);">
						{recipe.description}
					</text>

					<!-- Recipe Meta -->
					<hstack spacing="16" modifiers="padding(.top, 8);">
						<hstack spacing="4">
							<text>⏱️</text>
							<text modifiers="font(.caption);foregroundColor(.secondary);">
								{recipe.cookTime}
							</text>
						</hstack>

						<hstack spacing="4">
							<text>👨‍🍳</text>
							<text modifiers="font(.caption);foregroundColor(.secondary);">
								{recipe.difficulty}
							</text>
						</hstack>
					</hstack>
				</vstack>
			</vstack>
		{/each}
	</lazyvgrid>

	<!-- Features Section -->
	<vstack alignment="leading" spacing="20" modifiers="padding(.horizontal, 20);padding(.bottom, 40);">
		<hstack spacing="8">
			<text>🍳</text>
			<text modifiers="font(.title2);fontWeight(.semibold);foregroundColor(.primary);">
				Why Choose Recipe Hub?
			</text>
		</hstack>

		<lazyvgrid columns="[GridItem(.adaptive(minimum: 250))]" spacing="16">
			{#each appFeatures as feature}
				<vstack spacing="12" modifiers="padding(20);background(.background);cornerRadius(16);shadow(.drop(radius: 2, x: 0, y: 1));">
					<text modifiers="font(.title);">
						{feature.icon}
					</text>

					<text modifiers="font(.headline);fontWeight(.semibold);foregroundColor(.primary);multilineTextAlignment(.center);">
						{feature.title}
					</text>

					<text modifiers="font(.body);foregroundColor(.secondary);multilineTextAlignment(.center);">
						{feature.description}
					</text>
				</vstack>
			{/each}
		</lazyvgrid>
	</vstack>
</scrollview>