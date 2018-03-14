<template>
  <div class='banner'>
    <div class='banner-text'>
	  <h1><slot></slot></h1>
  <slot name='description'></slot>
  </div>
  <slot class='banner-controls' name='controls'></slot>
  </div>
</template>
<script>
export default {
	data() {
		return {
			title: 'hello world!',
		};
	},
};
</script>
<style lang='scss'>
@import '~vars';
.banner {
	max-width: 100vw;
	background-color: $color-primary-light;
	color: $text-alt;
	padding: $padding-large;

	display: flex;
	justify-content: space-between;
	align-items: center;

	h1 {
		margin-top: 0;
		margin-bottom: 0;
	}
}
.banner-controls button {
	font-size: $text-default;
}
</style>
