import StyledLog from "../src/index.js";

new StyledLog().html`
	Styling using
	<multi class="multiple">multiple</multi>
	<div class="classes">classes</div>
	is also possible!
`.css`
	div {
		color: #8D7A5E;
	}
	.multiple, .classes {
		font-size: 2em;
	}
`.log();
