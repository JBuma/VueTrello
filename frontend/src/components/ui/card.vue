<template>
  <div class='card' :class='type'>
	  <div class='card-title'><slot name='title'></slot></div>
      <slot name='body'></slot>
    <div class='card-description'>
      <slot name='description'></slot>
    </div>
    <div class='card-meta'>
      <slot name='meta'></slot>
    </div>
  </div>
</template>
<script>
export default {
	props: {
		type: {
			type: String,
			// required:true
		},
	},
	data() {
		return {};
	},
};
</script>
<style lang='scss'>
@import '~vars';
.card {
	background-color: $color-background-light;
	box-shadow: $box-shadow--large $box-shadow--color-default;
	width: 250px;

	&.centered {
		margin: 0 auto;
	}

	.card-body {
		height: 200px;
		background-color: $color-accent;
	}

	.card-description {
		padding: 10px;
	}

	.card-title {
		// h3 {
		background-color: #018e4c;
		color: white;
		padding: 10px 10px;
		margin: 0;
		// }
		.link:hover,
		.link:focus {
			text-decoration: underline;
		}
	}

	.card-meta {
		font-size: 12px;
		font-style: italic;
		background-color: #fcfcfc;
		padding: 1px 10px;
	}
}
</style>
