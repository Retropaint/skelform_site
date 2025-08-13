<script lang="ts">
	// global styling
	import Styles from './styles.svelte';

	// components
	import SkfButton from './skf_button.svelte';
	import SellingPoint from './selling_point.svelte';
	import SkfHeader from './skf_header.svelte';
	import RuntimesTable from './runtimes_table.svelte';
	import Roadmap from './roadmap.svelte';
	import Kofi from './kofi.svelte';

	import img_rig_point from '$lib/assets/rig_point.png';
	import img_psd_support from '$lib/assets/psd_support.png';
	import img_skellington_reading from '$lib/assets/skellington_reading.png';
	import img_contributing from '$lib/assets/contributing.png';

	import img_macroquad from '$lib/assets/macroquad.png';
	import img_pygame from '$lib/assets/pygame.png';
	import img_ebiten from '$lib/assets/ebiten.png';
	import img_rust from '$lib/assets/rust.png';
	import img_python from '$lib/assets/python.webp';
	import img_gopher from '$lib/assets/gopher.svg';

	import img_windows from '$lib/assets/windows.png';
	import img_apple from '$lib/assets/apple.png';
	import img_linux from '$lib/assets/linux.webp';

	import img_discord from '$lib/assets/discord.png';
	import img_github from '$lib/assets/github.png';

	let engine_runtimes = [
		{
			img_src: img_macroquad,
			link: 'https://crates.io/crates/rusty_skelform_macroquad',
			name: 'Macroquad',
			repo: 'https://github.com/Retropaint/rusty_skelform_macroquad'
		},
		{
			img_src: img_pygame,
			link: 'https://pypi.org/project/skelform-pygame/',
			name: 'Pygame',
			repo: 'https://github.com/Retropaint/skelform_pygame'
		},
		{
			img_src: img_ebiten,
			link: 'https://pkg.go.dev/github.com/retropaint/skelform_ebiten',
			name: 'Ebiten',
			repo: 'https://github.com/Retropaint/skelform_ebiten'
		}
	];

	let generic_runtimes = [
		{
			img_src: img_rust,
			link: 'https://crates.io/crates/rusty_skelform',
			name: 'Rust',
			is_engine: false,
			repo: 'https://github.com/Retropaint/rusty_skelform'
		},
		{
			img_src: img_python,
			link: 'https://pypi.org/project/skelform-python/',
			name: 'Python',
			is_engine: false,
			repo: 'https://github.com/Retropaint/skelform_python'
		},
		{
			img_src: img_gopher,
			link: 'https://pkg.go.dev/github.com/retropaint/skelform_go',
			name: 'Go',
			repo: 'https://github.com/Retropaint/skelform_go'
		}
	];
</script>

<svelte:head>
	<title>SkelForm</title>
	<meta name="description" content="Free and open-source 2D skeletal animator" />
</svelte:head>

<div class="main-content">
	<a
		aria-label="Github"
		class="github"
		href="https://github.com/Retropaint/SkelForm"
		target="_blank"
	>
		<img src={img_github} width="40px" alt="github icon" />
	</a>
	<a
		aria-label="Discord"
		class="discord"
		href="https://discord.com/invite/V9gm4p4cAB"
		target="_blank"
	>
		<img src={img_discord} width="40px" alt="discord icon" />
	</a>

	{#if false}
		<SkfHeader />
	{/if}

	<div style="padding-top: 13rem"></div>

	<div style="color: white; text-align: center">
		<h1>SkelForm</h1>
		<div style="padding-bottom: 0.5rem"></div>
		<h2 class="subtitle">A free and open-source 2D skeletal animator</h2>
	</div>

	<div class="centered">
		<div style="margin-top: 1.5rem"></div>
		<SkfButton content="Try Now!" link="https://retropaint.github.io/skelform_web/" />
		<div style="margin-top: 1.5rem"></div>
		<p style="text-align: center; font-size: 1rem; color: white">
			Downloads for Windows, Mac, & Linux will be available soon!
		</p>
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

	<div style="margin-bottom: 5rem"></div>

	<SellingPoint
		header="Skeleton Rigs & Animations"
		content="Bring static images to life by combining them to form a rig, and animate them individually!"
		img={img_rig_point}
		img_style="width: 80%"
	/>
	<SellingPoint
		header="PSD Import Support"
		content="Set up rigs directly from your favourite art program!"
		img={img_psd_support}
		img_style="width: 95%"
		is_even
	/>
	<SellingPoint
		header="Getting Started"
		content="
			Check out the <a href='https://retropaint.github.io/skelform_user_docs/' target='_blank'>User Documentation</a> for a written guide on getting started with SkelForm.<br>
			Additionally, the editor provides a show-don't-tell tour via a help light.<br><br>
			If you're a developer, check out the <a href='https://retropaint.github.io/skelform_dev_docs/' target='_blank'>Developer Documentation.</a>"
		img={img_skellington_reading}
	/>

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

	<SellingPoint
		header="Contributing"
		content="
			<a href='https://github.com/Retropaint/SkelForm/issues' target='_blank' >Editor Issues tracker</a> 
				- Report bugs and/or suggestions here. They can also be reported in the #bug-reports and #suggestions channels in the 
				<a href='https://discord.com/invite/V9gm4p4cAB' target='_blank'>Discord</a>.<br><br>

			<a href='https://github.com/Retropaint/SkelForm/issues' target='_blank' >Website Issues tracker</a> 
				- Ditto the above for this site. Submit runtimes to potentially be featured in the above table(s)!"
		img={img_contributing}
		img_style=""
		is_even
	/>

	<p class="footer">
		Made with <span style="color: rgb(235, 82, 63)">U+2764</span> by
		<a href="https://github.com/Retropaint" target="_blank" style="color: #8c7cc6">Retropaint</a>
		<Kofi></Kofi>
	</p>
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

	.runtimes {
		color: white;
		padding: 0 1rem;
	}

	.subtitle {
		font-size: 1.1rem;
		font-weight: normal;

		a {
			color: #cabcff;
		}
	}

	.footer {
		text-align: center;
		color: white;
	}

	.github {
		position: absolute;
		right: 7rem;
		top: 2.6rem;
	}
	.discord {
		position: absolute;
		right: 3rem;
		top: 3rem;
	}
</style>
