<script>
	let {
		content = $bindable(''),
		img = $bindable(),
		invert = $bindable(),
		link = $bindable()
	} = $props();
</script>

<a class="button" href={link} target="_blank">
	{#if content != ''}
		<p class="content">{content}</p>
	{/if}
	{#if img != null}
		<img src={img} class={invert ? 'invert' : ''} />
	{/if}
</a>

<style>
	.button {
		color: #d6d6d6;
		background: rgb(65, 46, 105);
		border: 2px solid rgb(44, 36, 64);
		cursor: pointer;
		font-size: 1.25rem;
		width: fit-content;
		padding: 6px;
		text-decoration: none;
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 0 0.25rem;
	}

	.content {
		margin: 4px;
	}

	img {
		width: 3rem;

		&.invert {
			filter: invert();
		}
	}
</style>
