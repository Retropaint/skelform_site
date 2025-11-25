<script>
	let {
		content = $bindable(''),
		img = $bindable(),
		invert = $bindable(),
		link = $bindable(),
		alt = $bindable(),
		css = $bindable()
	} = $props();
</script>

<a class="button {css}" rel="external" href={link} target="_blank">
	{#if content != ''}
		<p class="content">{content}</p>
	{/if}
	{#if img != null}
		<img {alt} src={img} class={invert ? 'invert' : ''} />
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

		&.small {
			padding: 3px;
			font-size: 1rem;
		}
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
