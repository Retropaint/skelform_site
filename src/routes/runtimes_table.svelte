<script>
	let { content = $bindable(), is_engine = $bindable() } = $props();
	import { dev } from '$app/environment';
</script>

<table>
	<tbody>
		<tr style="text-align: left">
			<th class="icon-width"></th>
			<th>Runtime</th>
			<!--
			{#if is_engine}
				<th>Language</th>
			{/if}
			-->
			<th>Repo</th>
		</tr>
		{#each content as runtime}
			<tr>
				<td class="icon-width"
					><img alt={runtime.name} class="icon-width" src={runtime.img_src} /></td
				>
				<td><a href={runtime.link} target="_blank">{runtime.name}</a></td>
				<!--
				{#if is_engine}
					<td>{runtime.language}</td>
				{/if}
				-->
				<td><a href={runtime.repo} target="_blank">Github</a></td>
			</tr>
		{/each}
	</tbody>
</table>

<style>
	table {
		margin: auto;
		border: 1px solid var(--accent);
		border-collapse: collapse;
		min-width: 17rem;

		.icon-width {
			width: 25px;
			height: 25px;
		}

		td,
		th {
			border: 1px solid var(--accent);
			padding: 5px;
			text-align: center;
		}

		img {
			display: flex;
		}

		a {
			color: var(--light-accent);
		}
	}
</style>
