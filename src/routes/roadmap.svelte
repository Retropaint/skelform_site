<script>
	import RoadmapItem from './roadmap-item.svelte';
	import { dev } from '$app/environment';

	let RoadmapData;

	let base_url = '';

	// track folded sections
	let folded = {};

	export const onload = async () => {
		let res = await fetch(base_url + '/data/roadmap.json');
		RoadmapData = await res.json();

		let last_section = '';
		RoadmapData.forEach((item) => {
			if (item.section) {
				folded[item.section] = item.folded;
				last_section = item.section;
			} else {
				item.in_section = last_section;
			}
		});
		console.log(RoadmapData);
	};
</script>

<div class="main" use:onload>
	<a href="#feature-roadmap" id="feature-roadmap"><h2>Feature Roadmap</h2></a>

	<div class="container">
		<div class="line"></div>

		<div class="roadmap">
			{#each RoadmapData as item}
				{#if !folded[item.in_section] || item.section}
					<RoadmapItem {item} bind:folded></RoadmapItem>
				{/if}
			{/each}
		</div>
	</div>

	<i class="runtime-note">
		*Runtime feature - may not be immediately available after release on some runtimes.
	</i>
</div>

<style>
	.main {
		background: #352062;
		padding: 0.5rem 0;
	}

	.container {
		margin-bottom: 2rem;
		margin-left: 35%;
		position: relative;

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
	}
</style>
