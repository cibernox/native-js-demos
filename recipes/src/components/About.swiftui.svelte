<script lang="ts">
	import { teamMembers, appStats, companyValues } from '$lib/data';
</script>

<scrollview modifiers="background(.background);">
	<vstack spacing="30" modifiers="padding(.horizontal, 20);padding(.vertical, 20);">
		<!-- Page Title -->
		<text modifiers="font(.largeTitle);fontWeight(.bold);foregroundColor(.primary);multilineTextAlignment(.center);">
			About Recipe Hub
		</text>

		<!-- Our Story Section -->
		<vstack alignment="leading" spacing="20" modifiers="padding(24);background(.background);cornerRadius(16);shadow(.drop(radius: 4, x: 0, y: 2));">
			<hstack spacing="8">
				<text>🍽️</text>
				<text modifiers="font(.title2);fontWeight(.semibold);foregroundColor(.primary);">
					Our Story
				</text>
			</hstack>

			<vstack alignment="leading" spacing="16">
				<text modifiers="font(.body);foregroundColor(.primary);lineSpacing(4);">
					Recipe Hub was born from a simple belief: everyone deserves access to delicious, healthy, and easy-to-make meals. Founded in 2020 by chef Sarah Chen, we've grown from a small collection of family recipes to a thriving community of food lovers from around the world.
				</text>

				<text modifiers="font(.body);foregroundColor(.primary);lineSpacing(4);">
					Our mission is to make cooking accessible, enjoyable, and sustainable. Whether you're a beginner learning to boil water or a seasoned chef looking for inspiration, we have something for everyone.
				</text>
			</vstack>
		</vstack>

		<!-- Statistics Section -->
		<vstack alignment="leading" spacing="20" modifiers="padding(24);background(.background);cornerRadius(16);shadow(.drop(radius: 4, x: 0, y: 2));">
			<hstack spacing="8">
				<text>📊</text>
				<text modifiers="font(.title2);fontWeight(.semibold);foregroundColor(.primary);">
					By the Numbers
				</text>
			</hstack>

			<lazyvgrid columns="[GridItem(.adaptive(minimum: 120))]" spacing="16">
				{#each appStats as stat}
					<vstack spacing="8" modifiers="padding(16);background(.secondary.opacity(0.1));cornerRadius(12);">
						<text modifiers="font(.title);fontWeight(.bold);foregroundColor(.primary);">
							{stat.value}
						</text>
						<text modifiers="font(.caption);fontWeight(.medium);foregroundColor(.secondary);multilineTextAlignment(.center);">
							{stat.label}
						</text>
					</vstack>
				{/each}
			</lazyvgrid>
		</vstack>

		<!-- Team Section -->
		<vstack alignment="leading" spacing="20" modifiers="padding(24);background(.background);cornerRadius(16);shadow(.drop(radius: 4, x: 0, y: 2));">
			<hstack spacing="8">
				<text>👥</text>
				<text modifiers="font(.title2);fontWeight(.semibold);foregroundColor(.primary);">
					Meet Our Team
				</text>
			</hstack>

			<lazyvgrid columns="[GridItem(.adaptive(minimum: 250))]" spacing="20">
				{#each teamMembers as member}
					<vstack spacing="16" modifiers="padding(20);background(.secondary.opacity(0.1));cornerRadius(16);">
						<!-- Team Photo -->
						<asyncimage url="{member.image}" modifiers="frame(width: 100, height: 100);clipShape(.circle);overlay(.circle.stroke(.primary, lineWidth: 3));">
							<circle modifiers="fill(.gray.opacity(0.3));frame(width: 100, height: 100);"></circle>
						</asyncimage>

						<!-- Team Info -->
						<vstack spacing="8" modifiers="multilineTextAlignment(.center);">
							<text modifiers="font(.headline);fontWeight(.semibold);foregroundColor(.primary);">
								{member.name}
							</text>

							<text modifiers="font(.subheadline);fontWeight(.medium);foregroundColor(.secondary);">
								{member.role}
							</text>

							<text modifiers="font(.caption);foregroundColor(.secondary);multilineTextAlignment(.center);padding(.horizontal, 8);">
								{member.bio}
							</text>
						</vstack>
					</vstack>
				{/each}
			</lazyvgrid>
		</vstack>

		<!-- Values Section -->
		<vstack alignment="leading" spacing="20" modifiers="padding(24);background(.background);cornerRadius(16);shadow(.drop(radius: 4, x: 0, y: 2));">
			<hstack spacing="8">
				<text>🌱</text>
				<text modifiers="font(.title2);fontWeight(.semibold);foregroundColor(.primary);">
					Our Values
				</text>
			</hstack>

			<lazyvgrid columns="[GridItem(.adaptive(minimum: 200))]" spacing="16">
				{#each companyValues as value}
					<vstack spacing="16" modifiers="padding(20);background(.secondary.opacity(0.1));cornerRadius(16);">
						<!-- Value Icon -->
						<text modifiers="font(.title);">
							{value.icon}
						</text>

						<!-- Value Content -->
						<vstack spacing="8" modifiers="multilineTextAlignment(.center);">
							<text modifiers="font(.headline);fontWeight(.semibold);foregroundColor(.primary);">
								{value.title}
							</text>

							<text modifiers="font(.subheadline);foregroundColor(.secondary);multilineTextAlignment(.center);padding(.horizontal, 4);">
								{value.description}
							</text>
						</vstack>
					</vstack>
				{/each}
			</lazyvgrid>
		</vstack>

		<!-- Bottom Spacing -->
		<spacer modifiers="frame(height: 20);"></spacer>
	</vstack>
</scrollview>