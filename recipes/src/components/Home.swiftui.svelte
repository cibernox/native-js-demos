<script lang="ts">
	import { recipes, appFeatures } from '$lib/data';
	let searchText = $state('');

	// Filter recipes based on search
	const filteredRecipes = $derived(searchText
		? recipes.filter(recipe =>
			recipe.title.toLowerCase().includes(searchText.toLowerCase()) ||
			recipe.description.toLowerCase().includes(searchText.toLowerCase())
		)
		: recipes
	);
</script>

<navigationstack>
	<vstack spacing="0">
		<!-- Search Bar -->
		<hstack modifiers="padding(.horizontal, 16);padding(.vertical, 8);">
			<hstack spacing="8" modifiers="padding(.horizontal, 12);padding(.vertical, 8);background(.gray.opacity(0.1));cornerRadius(10);">
				<image systemname="magnifyingglass" modifiers="foregroundColor(.secondary);" />
				<textfield text="{searchText}" prompt="Search recipes..." oninput="{(e) => searchText = e.target.value}" modifiers="textFieldStyle(.plain);" />
			</hstack>
		</hstack>

		<!-- Recipe List -->
		<scrollview>
			<lazyvstack spacing="0" modifiers="padding(.horizontal, 16);">
				<!-- Featured Section Header -->
				<hstack modifiers="padding(.vertical, 16);">
					<vstack alignment="leading" spacing="4">
						<text modifiers="font(.title2);fontWeight(.bold);">Featured Recipes</text>
						<text modifiers="font(.subheadline);foregroundColor(.secondary);">Handpicked just for you</text>
					</vstack>
					<spacer />
				</hstack>

				<!-- Recipe Cards -->
				{#each filteredRecipes as recipe}
					<vstack spacing="0" modifiers="background(.background);cornerRadius(12);shadow(.drop(radius: 2, x: 0, y: 1));marginBottom(16);">
						<!-- Recipe Image -->
						<asyncimage url={recipe.image} modifiers="frame(height: 200);clipped();cornerRadius(12, corners: [.topLeading, .topTrailing]);">
							<rectangle modifiers="fill(.gray.opacity(0.2));frame(height: 200);"></rectangle>
						</asyncimage>

						<!-- Recipe Content -->
						<vstack alignment="leading" spacing="8" modifiers="padding(16);">
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
						</vstack>
					</vstack>
				{/each}

				<!-- Quick Tips Section -->
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

				<!-- Bottom padding -->
				<spacer modifiers="frame(height: 20);" />
			</lazyvstack>
		</scrollview>
	</vstack>

	<navigationtitle modifiers="displayMode(.large);">Recipe Hub</navigationtitle>
</navigationstack>