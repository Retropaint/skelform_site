<script>
	let { item, folded = $bindable() } = $props();

	let desc = '';
	if (item.desc) desc = item.desc.split('~');
	let done = item.dueComplete;

	function hide() {
		folded[item.idx] = !folded[item.idx];
	}
</script>

<div class="roadmap-item {item.section ? 'section' : ''}">
	<div class="line"></div>
	{#if !item.section}
		<div class="circle {done ? 'done' : ''}"></div>
		{#if done}
			<p class="checkmark">✓</p>
		{/if}
	{/if}

	<p class="title {item.section ? 'section' : ''}">
		<a href={item.shortUrl} target="_blank">
			<span>
				{item.name}
			</span>
		</a>
		<span class="version">{desc[1]}</span>
	</p>
	<p class="desc">{desc[0]}</p>
	{#if desc[2]}
		<span class="fold" onclick={hide}>
			{#if folded[item.idx]}
				View Less
			{:else}
				View More
			{/if}
		</span>
		<br />
	{/if}
	{#if folded[item.idx]}
		<br />
		<p class="desc full">{desc[2]}</p>
	{/if}
</div>

<style>
	.roadmap-item {
		color: white;
		margin-left: 2rem;
		margin-bottom: 1rem;
		width: fit-content;

		&.section {
			margin-top: 3rem;
		}

		.title {
			margin: 0;
			font-size: 1.25rem;
			font-weight: bold;
			margin-bottom: 0.25rem;
			color: var(--light-accent);
			width: fit-content;

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
			width: 30rem;
			@media (max-width: 600px) {
				width: fit-content;
			}

			&.full {
				color: lightgrey;
				font-style: italic;
			}
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

	a {
		color: var(--light-accent);
	}

	.fold {
		color: white;
		cursor: pointer;
		margin: 0;
		color: lightgrey;
		font-style: italic;
		font-family: arial;
		width: 100%;
	}
</style>
