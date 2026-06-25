<script>
	import RoadmapItem from './roadmap-item.svelte';
	import { dev } from '$app/environment';

	let roadmapData;

	let base_url = '';

	// track folded sections
	let folded = {};

	export const onload = async () => {
		let res = await fetch('https://api.trello.com/1/lists/6a3d21229747708c988d38c2/cards');
		roadmapData = await res.json();
		roadmapData = roadmapData.slice(0, 5);

		let last_section = '';
		roadmapData.forEach((item, i) => {
			item.idx = i;
			folded[item.idx] = false;
		});
		console.log(folded);
	};
</script>

<div class="main" use:onload>
	<a href="#feature-roadmap" id="feature-roadmap"><h2>Feature Roadmap</h2></a>
	<p href="#feature-roadmap" id="feature-roadmap" style="display: block; text-align: center">
		Updated from the <a href="https://trello.com/b/KfA5U926/skelform-tracker" target="_blank"
			>Trello board</a
		>
	</p>

	<div class="container">
		<div>
			<div class="line"></div>
			<div class="roadmap">
				{#each roadmapData as item}
					{#if !folded[item.in_section] || item.section}
						<RoadmapItem {item} bind:folded></RoadmapItem>
					{/if}
				{/each}
			</div>
		</div>
	</div>

	<p href="#feature-roadmap" id="feature-roadmap" style="display: block; text-align: center">
		Check out the <a href="https://trello.com/b/KfA5U926/skelform-tracker" target="_blank"
			>Trello board</a
		> for a full list of features, bugs, runtime progress, and more!
	</p>
</div>

<style>
	.main {
		background: linear-gradient(180deg, #352062, #362162);
		padding: 0.5rem 0;
	}

	.container {
		margin-bottom: 2rem;
		position: relative;
		display: flex;
		justify-content: center;

		@media (max-width: 600px) {
			margin: 2rem;
		}
	}

	.roadmap {
		margin: auto;
		position: relative;
	}

	.line {
		width: 2px;
		height: 100%;
		background: white;
		margin-right: 1.5rem;
		position: absolute;
		margin: auto;
	}

	h2 {
		text-align: center;
		color: white;
		margin-bottom: 1rem;
	}

	.runtime-note {
		text-align: center;
		margin-bottom: 2rem;
		font-family: 'Arial';
		color: white;
		display: block;
		padding: 0 1rem;
	}

	#feature-roadmap {
		text-decoration: none;
		color: white;
		margin-top: 2px;

		h2 {
			margin-bottom: 0;
		}

		a {
			color: var(--light-accent);
		}
	}
</style>
