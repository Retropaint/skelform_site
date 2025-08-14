
<div class="roadmap-item">
	<div class="line"></div>
	<div class="circle"></div>
	<p class="checkmark">✓</p>
	<p class="title"></p>
	<p class="desc"></p>
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
				font-style: italic;
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
