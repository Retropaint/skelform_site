<script>
	let {
		is_even = $bindable(),
		header = $bindable(),
		content = $bindable(),
		img = $bindable(),
		img_style = $bindable()
	} = $props();

	import Img from '@zerodevx/svelte-img';

	import { onMount } from 'svelte';

	const onload = (event) => {
		event.innerHTML = content;
	};
</script>

<div class="selling-point {is_even ? 'even' : 'odd'}">
	<div class="mobile">
		<img src={img} class="odd" style={img_style} />
		<div class="content-container">
			<p class="header">{header}</p>
			<p class="content" use:onload></p>
		</div>
	</div>
	<div class="desktop">
		{#if is_even}
			<div class="content-container">
				<p class="header">{header}</p>
				<p class="content" use:onload></p>
			</div>
			<img src={img} />
		{:else}
			<img src={img} class="odd" />
			<div class="content-container">
				<p class="header">{header}</p>
				<p class="content" use:onload></p>
			</div>
		{/if}
	</div>
</div>

<style>
	.selling-point {
		min-height: 15rem;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0 2rem;

		.mobile {
			display: none;
		}
		.desktop {
			display: flex;

			img {
				margin-left: 2rem;

				&.odd {
					margin-left: 0;
					margin-right: 2rem;
				}
			}
		}

		@media (max-width: 600px) {
			.mobile {
				text-align: center;
				display: block;
				padding: 1rem 0;

				img {
					margin-bottom: 1rem;
				}
			}
			.desktop {
				display: none;
			}
		}

		img {
			width: auto;
			height: auto;
			max-width: 25rem;
			max-height: 12rem;
		}

		&.even {
			background: rgb(70, 42, 125);
			color: white;

			:global(a) {
				color: var(--light-accent);
			}
		}

		&.odd {
			background: var(--accent);

			:global(a) {
				color: rgb(70, 42, 125);
			}
		}

		.content-container {
			display: flex;
			flex-direction: column;
			justify-content: center;

			.content {
				max-width: 35rem;
			}
		}
	}

	.header {
		font-size: 1.6rem;
		font-weight: bold;
		margin: 0;
	}
</style>
