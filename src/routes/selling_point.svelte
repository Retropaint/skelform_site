<script>
	let { is_even, header, content, img, img_style } = $props();

	import Img from '@zerodevx/svelte-img';

	import { onMount } from 'svelte';

	const onload = (event) => {
		event.innerHTML = content;
	};
</script>

<div class="selling-point">
	<div class="img-container">
		<img alt={header} src={img} class="odd" style={img_style} />
	</div>
	<div class="content-container">
		<p class="header">{header}</p>
		<p class="content" use:onload></p>
	</div>
</div>

<style>
	.selling-point {
		min-height: 20rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		padding: 1rem 1rem;
		margin: 0.5rem;
		text-align: center;
		width: 20rem;
		background: rgb(84 62 133);
		border: 2px solid rgb(44, 36, 64);
		color: white;

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

	.img-container {
		display: flex;
		align-items: center;
		height: 12rem;
		justify-content: center;
	}
</style>
