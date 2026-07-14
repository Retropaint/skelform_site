<script>
	import { onMount } from 'svelte';
	let { showDonate = $bindable() } = $props();
	import img_rig_point from '$lib/assets/plsdonate.png';
	import Kofi from './kofi.svelte';

	function close() {
		showDonate = false;
	}

	function stopPropagating(event) {
		event.stopPropagation();
	}
</script>

<div class="container" onclick={close}>
	<div class="main" onclick={stopPropagating}>
		<div class="x">
			<p onclick={close}>X</p>
		</div>
		<a href="https://ko-fi.com/retropaintt" target="_blank"><img src={img_rig_point} /></a>
		<Kofi></Kofi>
		<div style="margin-bottom:1rem"></div>
		<p>If you enjoyed using SkelForm,</p>
		<p>please consider leaving a donation!</p>
	</div>
</div>

<style>
	.container {
		position: fixed;
		margin: auto;
		color: white;
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 99;
		width: 100%;
		height: 100%;
		font-family: arial;
		background: #0000005e;
		text-align: center;
	}

	.main {
		background: rgb(34, 23, 60);
		border: 1px solid rgb(62, 47, 102);
		padding: 2rem;
		margin-bottom: 3rem;
	}

	img {
		width: 200px;
		margin-bottom: 1rem;
	}

	p {
		margin: 0;
	}

	a {
		color: var(--light-accent);
	}

	.x {
		position: relative;
		width: 100%;
		right: -1rem;
		top: -1rem;

		p {
			position: absolute;
			right: 0;
			font-size: 24px;
			cursor: pointer;
		}
	}
</style>
