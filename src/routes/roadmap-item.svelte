<script>
	let { item, folded = $bindable() } = $props();

	function hide() {
		folded[item.section] = !folded[item.section];
	}
</script>

<div class="roadmap-item {item.section ? 'section' : ''}">
	<div class="line"></div>
	{#if !item.section}
		<div class="circle {item.version ? 'done' : ''}"></div>
		{#if item.version}
			<p class="checkmark">✓</p>
		{/if}
	{/if}

	<p class="title {item.section ? 'section' : ''}">
		{#if item.section}
			<button class="fold" onclick={hide}>
				{#if folded[item.section]}
					⏵
				{:else}
					⏷
				{/if}
			</button>
		{/if}
		<span>
			{item.title || item.section}
			<span class="version">{item.version}</span>
		</span>
	</p>
	<p class="desc">{item.desc}</p>
</div>

<style>
	.roadmap-item {
		color: white;
		margin-left: 2rem;
		margin-bottom: 1rem;

		&.section {
			margin-top: 3rem;
		}

		.title {
			margin: 0;
			font-size: 1.25rem;
			font-weight: bold;
			margin-bottom: 0.25rem;
			color: var(--light-accent);

			&.section {
				color: white;

				button {
					background: none;
					color: inherit;
					border: none;
					padding: 0;
					font: inherit;
					cursor: pointer;
					outline: inherit;
				}

				span {
					font-style: italic;
				}
			}

			.version {
				font-size: 0.75rem;
			}
		}
		.desc {
			margin: 0;
		}
	}

	.line {
		width: 2px;
		height: max-content;
		background: white;
		position: absolute;
		transform: translateX(-20px);
	}

	.circle {
		border: 2px solid white;
		border-radius: 99rem;
		width: 1rem;
		height: 1rem;
		position: absolute;
		background: #352062;
		transform: translate(-41px, 2px);

		&.done {
			background: white;
		}
	}

	.checkmark {
		position: absolute;
		color: red;
		transform: translate(-37px, -12px);
		color: var(--bg-accent);
	}
</style>
