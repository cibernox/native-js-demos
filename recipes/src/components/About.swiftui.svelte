<script lang="ts">
	import { teamMembers, appStats, companyValues } from '$lib/data';
</script>

<navigationstack>
	<scrollview>
		<lazyvstack spacing="0" modifiers="padding(.horizontal, 0);">

			<!-- Hero Section -->
			<vstack spacing="16" modifiers="padding(.horizontal, 20);padding(.vertical, 32);background(.blue.gradient);cornerRadius(0);">
				<text modifiers="font(.largeTitle);fontWeight(.bold);foregroundColor(.white);multilineTextAlignment(.center);">
					About Recipe Hub
				</text>
				<text modifiers="font(.title3);foregroundColor(.white.opacity(0.9));multilineTextAlignment(.center);">
					Making cooking accessible for everyone
				</text>
			</vstack>

			<!-- Statistics Cards -->
			<lazyhgrid rows="[GridItem(.fixed(80))]" spacing="12" modifiers="padding(.horizontal, 20);padding(.vertical, 24);">
				{#each appStats as stat}
					<vstack spacing="4" modifiers="padding(.vertical, 16);padding(.horizontal, 12);background(.gray.opacity(0.05));cornerRadius(12);frame(minWidth: 80);">
						<text modifiers="font(.title2);fontWeight(.bold);foregroundColor(.orange);">
							{stat.value}
						</text>
						<text modifiers="font(.caption);fontWeight(.medium);foregroundColor(.secondary);multilineTextAlignment(.center);">
							{stat.label}
						</text>
					</vstack>
				{/each}
			</lazyhgrid>

			<!-- Our Story Section -->
			<section modifiers="padding(.horizontal, 20);padding(.bottom, 24);">
				<text modifiers="font(.headline);fontWeight(.semibold);padding(.bottom, 12);">Our Story</text>
				<vstack spacing="16" modifiers="padding(.vertical, 16);padding(.horizontal, 16);background(.background);cornerRadius(12);">
					<text modifiers="font(.body);foregroundColor(.primary);lineSpacing(2);">
						Recipe Hub was born from a simple belief: everyone deserves access to delicious, healthy, and easy-to-make meals. Founded in 2020 by chef Sarah Chen, we've grown from a small collection of family recipes to a thriving community of food lovers.
					</text>
					<text modifiers="font(.body);foregroundColor(.primary);lineSpacing(2);">
						Our mission is to make cooking accessible, enjoyable, and sustainable for cooks of all skill levels.
					</text>
				</vstack>
			</section>

			<!-- Team Section -->
			<section modifiers="padding(.horizontal, 20);padding(.bottom, 24);">
				<text modifiers="font(.headline);fontWeight(.semibold);padding(.bottom, 12);">Meet Our Team</text>
				<vstack spacing="1" modifiers="background(.background);cornerRadius(12);overflow(.hidden);">
					{#each teamMembers as member, index}
						<hstack spacing="12" modifiers="padding(.horizontal, 16);padding(.vertical, 12);background(.background);">
							<!-- Profile Image -->
							<asyncimage url={member.image} modifiers="frame(width: 60, height: 60);clipShape(.circle);">
								<circle modifiers="fill(.gray.opacity(0.3));frame(width: 60, height: 60);"></circle>
							</asyncimage>

							<!-- Member Info -->
							<vstack alignment="leading" spacing="2">
								<text modifiers="font(.headline);fontWeight(.semibold);">
									{member.name}
								</text>
								<text modifiers="font(.subheadline);foregroundColor(.orange);fontWeight(.medium);">
									{member.role}
								</text>
								<text modifiers="font(.caption);foregroundColor(.secondary);lineLimit(2);">
									{member.bio}
								</text>
							</vstack>

							<spacer />

							<!-- Chevron -->
							<image systemname="chevron.right" modifiers="font(.caption);foregroundColor(.tertiary);" />
						</hstack>

						{#if index < teamMembers.length - 1}
							<divider modifiers="padding(.leading, 88);" />
						{/if}
					{/each}
				</vstack>
			</section>

			<!-- Values Section -->
			<section modifiers="padding(.horizontal, 20);padding(.bottom, 24);">
				<text modifiers="font(.headline);fontWeight(.semibold);padding(.bottom, 12);">Our Values</text>
				<vstack spacing="12">
					{#each companyValues as value}
						<hstack spacing="16" modifiers="padding(.horizontal, 16);padding(.vertical, 16);background(.background);cornerRadius(12);">
							<!-- Value Icon -->
							<vstack modifiers="frame(width: 44, height: 44);background(.orange.opacity(0.1));cornerRadius(22);">
								<text modifiers="font(.title2);">
									{value.icon}
								</text>
							</vstack>

							<!-- Value Content -->
							<vstack alignment="leading" spacing="4">
								<text modifiers="font(.headline);fontWeight(.semibold);">
									{value.title}
								</text>
								<text modifiers="font(.subheadline);foregroundColor(.secondary);lineLimit(3);">
									{value.description}
								</text>
							</vstack>

							<spacer />
						</hstack>
					{/each}
				</vstack>
			</section>

			<!-- Contact Section -->
			<section modifiers="padding(.horizontal, 20);padding(.bottom, 40);">
				<text modifiers="font(.headline);fontWeight(.semibold);padding(.bottom, 12);">Get In Touch</text>
				<vstack spacing="1" modifiers="background(.background);cornerRadius(12);overflow(.hidden);">
					<button modifiers="padding(.horizontal, 16);padding(.vertical, 16);background(.background);">
						<hstack spacing="12">
							<image systemname="envelope" modifiers="font(.title3);foregroundColor(.orange);" />
							<text modifiers="font(.body);fontWeight(.medium);foregroundColor(.primary);">
								Send us feedback
							</text>
							<spacer />
							<image systemname="chevron.right" modifiers="font(.caption);foregroundColor(.tertiary);" />
						</hstack>
					</button>

					<divider />

					<button modifiers="padding(.horizontal, 16);padding(.vertical, 16);background(.background);">
						<hstack spacing="12">
							<image systemname="star" modifiers="font(.title3);foregroundColor(.orange);" />
							<text modifiers="font(.body);fontWeight(.medium);foregroundColor(.primary);">
								Rate us on the App Store
							</text>
							<spacer />
							<image systemname="chevron.right" modifiers="font(.caption);foregroundColor(.tertiary);" />
						</hstack>
					</button>

					<divider />

					<button modifiers="padding(.horizontal, 16);padding(.vertical, 16);background(.background);">
						<hstack spacing="12">
							<image systemname="square.and.arrow.up" modifiers="font(.title3);foregroundColor(.orange);" />
							<text modifiers="font(.body);fontWeight(.medium);foregroundColor(.primary);">
								Share Recipe Hub
							</text>
							<spacer />
							<image systemname="chevron.right" modifiers="font(.caption);foregroundColor(.tertiary);" />
						</hstack>
					</button>
				</vstack>
			</section>

		</lazyvstack>
	</scrollview>

	<navigationtitle>About</navigationtitle>
</navigationstack>