<script lang="ts">
	// global styling
	import Styles from './styles.svelte';
	import { dev } from '$app/environment';
	import { onMount } from 'svelte';
	import Device from 'svelte-device-info';

	// components
	import SkfButton from './skf_button.svelte';
	import SellingPoint from './selling_point.svelte';
	import SkfHeader from './skf_header.svelte';
	import RuntimesTable from './runtimes_table.svelte';
	import Roadmap from './roadmap.svelte';
	import Kofi from './kofi.svelte';

	import img_logo from '$lib/assets/logo.png';

	import img_rig_point from '$lib/assets/rig_point.png';
	import img_psd_support from '$lib/assets/psd_support.png';
	import img_ik_support from '$lib/assets/inverse_kinematics.png';
	import img_meshdef_support from '$lib/assets/meshdef.png';
	import img_skellington_reading from '$lib/assets/skellington_reading.png';
	import img_contributing from '$lib/assets/contributing.png';
	import img_styles_point from '$lib/assets/styles_point.png';
	import img_exports from '$lib/assets/exports.png';

	import img_windows from '$lib/assets/windows.png';
	import img_apple from '$lib/assets/apple.png';
	import img_linux from '$lib/assets/linux.png';

	let generic_runtimes = {};
	let engine_runtimes = {};
	let download_links = {};
	let header_data = [];

	let base_url = '';

	let show_header = false;
	let show_socials = false;
	let mobile_dropdown = false;
	let innerWidth = 0;
	let innerHeight = 0;
	let mobile = Device.isMobile || Device.isPhone || Device.isTablet;

	export const onload = async () => {
		let res;

		res = await fetch(base_url + '/generic_runtimes.json');
		generic_runtimes = await res.json();

		res = await fetch(base_url + '/engine_runtimes.json');
		engine_runtimes = await res.json();

		res = await fetch(base_url + '/download_links.json');
		download_links = await res.json();

		res = await fetch(base_url + '/header.json');
		header_data = await res.json();
	};

	let canvasSize = {
		x: 600,
		y: 450
	};

	onMount(async () => {
		var body = document.body;
		var html = document.documentElement;

		var height = Math.max(
			body.scrollHeight,
			body.offsetHeight,
			html.clientHeight,
			html.scrollHeight,
			html.offsetHeight
		);

		// This code only runs in the browser
		window.addEventListener('scroll', function (e) {
			var scrollPosition = window.scrollY || document.documentElement.scrollTop;
			show_header = scrollPosition > height * 0.2;
		});

		if (mobile) {
			canvasSize.x = 320;
			canvasSize.y = 450;
		}

		async function start() {
			let skellington = await SkfDownloadSample('https://skelform.org/editor/_skellington.skf');
			let skellina = await SkfDownloadSample('https://skelform.org/editor/_skellina.skf');
			await SkfInit(skellington, glcanvas);
			await SkfInit(skellina, gl2canvas);

			skfCanvases[0].activeStyles = [skfCanvases[0].armature.styles[1]];
			skfCanvases[1].activeStyles = [skfCanvases[1].armature.styles[0]];
			skfCanvases[0].smoothFrames = 0;
			skfCanvases[0].constructOptions.scale = { x: 0.125, y: 0.125 };
			skfCanvases[0].constructOptions.position = { x: canvasSize.x / 2, y: -canvasSize.y / 2 };
			skfCanvases[1].constructOptions.scale = { x: 0.125, y: 0.125 };
			skfCanvases[1].constructOptions.position = { x: canvasSize.x / 2, y: -canvasSize.y / 2 };

			SkfShowPlayer('skellington', skfCanvases[0]);
			SkfShowPlayer('skellina', skfCanvases[1]);

			requestAnimationFrame(SkfNewFrame);
		}
		start();
	});

	let skellingtonVisible = 'block';
	let skellinaVisible = 'none';

	function resetSkfCanvases() {
		skellingtonVisible = 'none';
		skellinaVisible = 'none';
		skfCanvases[0].animTime = 0;
		skfCanvases[1].animTime = 0;
	}

	let baseUrl = '.';
</script>

<svelte:head>
	<script src="{baseUrl}/api.js"></script>
	<script src="{baseUrl}/skelform-js.js"></script>
	<script src="{baseUrl}/jszip.js"></script>
</svelte:head>

<div class="main-content" use:onload use:onscroll>
	<header>
		<a href="#top" style="text-decoration: none">
			<div class="left-side {show_header ? 'visible' : ''}" href="#top">
				<img src={img_logo} alt="logo" />
				<p class="title">SkelForm</p>
			</div>
		</a>
		<div class="right-side">
			{#if mobile}
				<span
					class="socials-button"
					style="font-size: 24px; transform: translateY(-2px)"
					onclick={() => {
						mobile_dropdown = true;
					}}>☰</span
				>
				{#if mobile_dropdown}
					<div
						class="mobile-dropdown-container"
						onclick={() => {
							mobile_dropdown = false;
						}}
					>
						<div
							class="mobile-dropdown"
							onclick={(event) => {
								event.stopPropagation();
							}}
						>
							{#each header_data as element}
								<a
									aria-label={element.title}
									class="header-mobile-button"
									href={element.link}
									target="_blank"
								>
									<span>{element.title}</span>
								</a>
							{/each}
						</div>
					</div>
				{/if}
			{:else}
				{#each header_data as element}
					{#if !element.socials}
						<a aria-label={element.title} class="header-button" href={element.link} target="_blank">
							<span>{element.title}</span>
						</a>
					{/if}
				{/each}
				<div class="socials-container">
					<p
						class="socials-button"
						onclick={() => {
							show_socials = !show_socials;
						}}
					>
						Socials <span style="transform:scale(0.75) translateX(6px)"
							>{show_socials ? '▲' : '▼'}</span
						>
					</p>
					{#if show_socials}
						<div class="socials-dropdown">
							{#each header_data as element}
								{#if element.socials}
									<a
										aria-label={element.title}
										href={element.link}
										class="socials-option"
										target="_blank"
									>
										<span>{element.title}</span>
									</a>
								{/if}
							{/each}
						</div>
					{/if}
				</div>
			{/if}
		</div>
	</header>

	{#if false}
		<SkfHeader />
	{/if}

	<div style="padding-top: 6rem"></div>

	<div style="color: white; text-align: center">
		<img href="#top" src={img_logo} class="logo" alt="github icon" />
		<h1>SkelForm</h1>
		<div style="padding-bottom: 0.5rem"></div>
		<h2 class="subtitle">A free and open-source 2D skeletal animator</h2>
	</div>

	<div class="centered">
		<div style="margin-top: 1.5rem"></div>
		<SkfButton content="Open Web Editor" link="/editor/" />
		<div style="margin-top: 1.5rem"></div>
		<p style="text-align: center; font-size: 1rem; color: white; margin: 0; margin-bottom: 0.5rem;">
			Download:
		</p>
		<div class="downloads">
			<SkfButton img={img_windows} link={download_links.windows} alt="windows" />
			<SkfButton img={img_apple} link={download_links.mac} alt="mac" />
			<SkfButton img={img_linux} link={download_links.linux} alt="linux" invert />
		</div>
		<div style="margin-top: 0.5rem"></div>
		<SkfButton
			link="https://github.com/Retropaint/SkelForm/releases"
			content="Other Versions"
			css="small"
		/>
		{#if false}
			<p class="header">Download:</p>
			<div style="margin-top: 0.75rem"></div>
			<div class="platforms">
				<SkfButton img={img_windows} />
				<SkfButton img={img_apple} />
				<SkfButton img={img_linux} invert />
			</div>
		{/if}
	</div>

	<div style="margin-bottom: 3rem"></div>

	<div
		id="skellington"
		style="width: {canvasSize.x}px; height: {canvasSize.y}px; background: #685288; margin: auto; display:{skellingtonVisible}"
	>
		<canvas id="glcanvas" width={canvasSize.x} height={canvasSize.y}></canvas>
	</div>

	<div
		id="skellina"
		style="width: {canvasSize.x}px; height: {canvasSize.y}px; background: #685288; margin: auto; display: {skellinaVisible}"
	>
		<canvas id="gl2canvas" width={canvasSize.x} height={canvasSize.y}></canvas>
	</div>
	<div style="margin-bottom: 5rem"></div>

	<div style="display: flex; justify-content: center">
		<div
			onclick={() => {
				resetSkfCanvases();
				skellingtonVisible = true;
			}}
		>
			<SkfButton content="Skellington" />
		</div>
		<div
			onclick={() => {
				resetSkfCanvases();
				skellinaVisible = true;
			}}
		>
			<SkfButton content="Skellina" />
		</div>
	</div>

	<div style="margin-bottom: 3rem"></div>

	<div class="sellingpoint-container">
		<SellingPoint
			header="Skeletal Animations"
			content="Bring static images to life by combining them to form a rig, and animate them individually!"
			img={img_rig_point}
			img_style="width: 80%"
		/>
		<SellingPoint
			header="Styles"
			content="Mix and match textures for all kinds of skins and outfits!"
			img={img_styles_point}
			img_style="width: 95%"
			is_even
		/>
		<SellingPoint
			header="Inverse Kinematics"
			content="Set up limbs and bend them convincingly by moving a single point!"
			img={img_ik_support}
			img_style="width: 95%"
			is_even
		/>
		<SellingPoint
			header="Mesh Deformation"
			content="Warp and deform textures with any amount of vertices!"
			img={img_meshdef_support}
			img_style="width: 95%"
		/>
		<SellingPoint
			header="PSD Import Support"
			content="Set up rigs directly from your favourite art program!"
			img={img_psd_support}
			img_style="width: 95%"
			is_even
		/>
		<SellingPoint
			header="Sheet & Video Exports"
			content="Export animations as spritesheets, sequences, or videos!"
			img={img_exports}
			img_style="width: 95%"
			is_even
		/>
	</div>

	<div style="padding-bottom: 2rem"></div>

	<div class="runtimes">
		<div style="text-align: center">
			<a class="header" href="#runtimes" id="runtimes">Runtimes</a>
		</div>

		<div style="text-align: center">
			<p>To run <b>SkelForm</b> animations in games, you need a runtime!</p>
			<p>
				<b>Engine</b> runtimes can be used immediately in select game engines.
			</p>
		</div>

		<RuntimesTable content={engine_runtimes} is_engine />

		<p style="text-align: center">
			<b>Generic</b> runtimes can be extended for any engine.
		</p>
		<RuntimesTable content={generic_runtimes} />
	</div>

	<div style="padding-bottom: 2rem"></div>

	<Roadmap></Roadmap>

	<div class="contributing {mobile ? 'mobile' : ''}">
		<img alt="contributing" src={img_contributing} />
		<div class="content-container">
			<p class="header">Contributing</p>
			<p class="content">
				<a href="https://github.com/Retropaint/SkelForm/issues" target="_blank"
					>Editor Issues tracker</a
				>
				- Report bugs and/or suggestions here. They can also be reported in the #bug-reports and #suggestions
				channels in the
				<a href="https://discord.com/invite/V9gm4p4cAB" target="_blank">Discord</a>.<br /><br />

				<a href="https://github.com/Retropaint/SkelForm/issues" target="_blank"
					>Website Issues tracker</a
				>
				- Ditto the above for this site. Submit runtimes to potentially be featured in the above table(s)!
			</p>
		</div>
	</div>

	<div class="footer">
		<p>
			Made with <span style="color: rgb(235, 82, 63)">U+2764</span> by
			<a href="https://github.com/Retropaint" target="_blank" style="color: #8c7cc6">Retropaint</a>
		</p>
		<Kofi></Kofi>
	</div>
</div>

<style>
	h1 {
		margin: auto;
		text-align: center;
		color: white;
	}

	h2 {
		margin: auto;
		text-align: center;
	}

	.main-content {
		background: linear-gradient(rgb(53, 32, 96), rgb(41, 22, 72));
		height: 100%;
	}

	.centered {
		display: flex;
		align-items: center;
		flex-direction: column;

		.platforms {
			display: flex;
			width: 15rem;
			justify-content: space-evenly;
		}
	}

	.header {
		font-size: 1.6rem;
		text-align: center;
		font-weight: bold;
		margin: 0;
		color: white;
		text-decoration: none;
	}

	.downloads {
		display: flex;
	}

	.runtimes {
		color: white;
		padding: 0 1rem;
	}

	.subtitle {
		font-size: 1.1rem;
		font-weight: normal;
	}

	.footer {
		text-align: center;
		color: white;
		margin: 1.25rem 1rem;

		p {
			margin: 0;
		}
	}

	header {
		display: flex;
		flex-direction: row;
		justify-content: space-evenly;
		position: fixed;
		width: 100vw;
		background: rgb(53, 32, 96);
		z-index: 999;

		@media (max-width: 600px) {
			justify-content: space-between;
		}

		.left-side {
			opacity: 0;
			display: flex;
			flex-direction: row;
			transition: opacity 0.5s;
			align-items: center;

			@media (max-width: 600px) {
				margin-left: 1.5rem;
			}

			&.visible {
				opacity: 1;
			}

			img {
				width: 3rem;
				transform: scaleY(1) translateY(-0.5px);
			}

			.title {
				margin-top: 0.5rem;
				margin-bottom: 0.5rem;
				margin-left: 1rem;
				color: white;
				font-size: 1.25rem;
				transform: translateY(-0.5px);
			}
		}

		.right-side {
			display: flex;
			flex-direction: row;

			@media (max-width: 600px) {
				margin-right: 0.25rem;
			}

			.header-button,
			.socials-button {
				text-decoration: none;
				display: flex;
				align-items: center;
				margin-top: 0.5rem;
				margin-bottom: 0.5rem;
				margin-right: 1.75rem;
				color: white;

				&:hover {
					color: #caa7fe;
				}

				@media (max-width: 600px) {
					margin-right: 1rem;
				}

				img {
					margin-right: 0.75rem;
					width: 1.5rem;
				}

				&.forum {
					img {
						margin-top: 0.25rem;
						width: 1.25rem;
					}
				}
			}

			.header-button:last-child {
				margin-right: 0rem;
			}
		}
	}

	.logo {
		width: 12rem;
		@media (max-width: 600px) {
			padding-top: 1rem;
		}
	}

	:global(.skf-range) {
		width: 100% !important;

		@media (max-width: 600px) {
			margin: 0 !important;
		}
	}

	.sellingpoint-container {
		margin: auto;
		max-width: 75rem;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
	}

	.contributing {
		display: flex;
		flex-direction: row-reverse;
		background: rgb(84 62 133);
		padding: 0rem 21rem;
		color: white;

		.content-container {
			display: flex;
			align-items: flex-start;
			flex-direction: column;
			justify-content: center;
		}

		a {
			color: #caa7fe;
		}

		img {
			width: 12rem;
			margin: 1rem;
		}

		&.mobile {
			display: flex;
			padding: 1rem;
			flex-direction: column;
			align-items: center;

			img {
				width: 10rem;
				margin-bottom: 1rem;
			}

			.header {
				margin: auto;
			}
		}
	}

	.socials-container {
		display: flex;
		position: relative;
		cursor: pointer;
		user-select: none;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;

		p {
			margin: 0;
		}

		.socials-dropdown {
			position: absolute;
			top: 3rem;
			padding: 0.5rem;
			background: #55458e;
			display: flex;
			flex-direction: column;

			filter: drop-shadow(8px 8px 10px);
			.socials-option {
				color: white;
				margin: 0.5rem;
				text-decoration: none;

				&:hover {
					color: #caa7fe;
				}
			}
		}
	}

	.mobile-dropdown-container {
		width: 100vw;
		position: absolute;
		height: 100vh;
		left: 0;
		background: #00000054;

		.mobile-dropdown {
			background: rgb(53, 32, 96);
			right: 0;
			position: absolute;
			height: 100vh;
			width: 10rem;
			display: flex;
			flex-direction: column;
			padding-top: 0.5rem;
			filter: drop-shadow(-1px 4px 6px black);
		}
	}

	.header-mobile-button {
		color: white;
		margin: 0.75rem;
		text-decoration: none;
	}
</style>
