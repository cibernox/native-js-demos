<script lang="ts">
	import { teamMembers, appStats, companyValues } from '$lib/data';
</script>

<div class="about-content">
	<h1>About Recipe Hub</h1>

	<div class="card">
		<h2>🍽️ Our Story</h2>
		<p>
			Recipe Hub was born from a simple belief: everyone deserves access to delicious,
			healthy, and easy-to-make meals. Founded in 2020 by chef Sarah Chen, we've grown
			from a small collection of family recipes to a thriving community of food lovers
			from around the world.
		</p>
		<p>
			Our mission is to make cooking accessible, enjoyable, and sustainable. Whether
			you're a beginner learning to boil water or a seasoned chef looking for inspiration,
			we have something for everyone.
		</p>
	</div>

	<div class="card">
		<h2>📊 By the Numbers</h2>
		<div class="stats-grid">
			{#each appStats as stat}
				<div class="stat-item">
					<div class="stat-value">{stat.value}</div>
					<div class="stat-label">{stat.label}</div>
				</div>
			{/each}
		</div>
	</div>

	<div class="card">
		<h2>👥 Meet Our Team</h2>
		<div class="team-grid">
			{#each teamMembers as member}
				<div class="team-card">
					<img
						src={member.image}
						alt={member.name}
						class="team-photo"
					/>
					<h3>{member.name}</h3>
					<p class="team-role">{member.role}</p>
					<p class="team-bio">{member.bio}</p>
				</div>
			{/each}
		</div>
	</div>

	<div class="card">
		<h2>🌱 Our Values</h2>
		<div class="values-grid">
			{#each companyValues as value}
				<div class="value-card">
					<div class="value-icon">{value.icon}</div>
					<h3>{value.title}</h3>
					<p>{value.description}</p>
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
	.stats-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
		gap: 1.5rem;
		margin-top: 1rem;
	}

	.stat-item {
		text-align: center;
		padding: 1rem;
		background: var(--secondary-color);
		border-radius: 8px;
	}

	.stat-value {
		font-size: 2rem;
		font-weight: 700;
		color: var(--primary-color);
		margin-bottom: 0.5rem;
	}

	.stat-label {
		color: var(--text-muted);
		font-weight: 500;
	}

	.team-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 1.5rem;
		margin-top: 1rem;
	}

	.team-card {
		text-align: center;
		padding: 1.5rem;
		background: var(--secondary-color);
		border-radius: 12px;
	}

	.team-photo {
		width: 100px;
		height: 100px;
		border-radius: 50%;
		object-fit: cover;
		margin-bottom: 1rem;
		border: 3px solid var(--primary-color);
	}

	.team-card h3 {
		margin: 0 0 0.5rem 0;
		color: var(--primary-color);
	}

	.team-role {
		font-weight: 600;
		color: var(--text-muted);
		margin: 0 0 0.5rem 0;
	}

	.team-bio {
		font-size: 0.9rem;
		color: var(--text-muted);
		margin: 0;
	}

	.values-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 1rem;
		margin-top: 1rem;
	}

	.value-card {
		text-align: center;
		padding: 1.5rem;
		background: var(--secondary-color);
		border-radius: 12px;
	}

	.value-icon {
		font-size: 2rem;
		margin-bottom: 1rem;
	}

	.value-card h3 {
		margin: 0 0 0.5rem 0;
		color: var(--primary-color);
	}

	.value-card p {
		margin: 0;
		color: var(--text-muted);
		font-size: 0.9rem;
	}

	@media (max-width: 768px) {
		.stats-grid {
			grid-template-columns: repeat(2, 1fr);
		}

		.team-grid {
			grid-template-columns: 1fr;
		}

		.values-grid {
			grid-template-columns: 1fr;
		}
	}
</style>