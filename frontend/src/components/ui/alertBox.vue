<template>
	<transition name='alert-enter'>
		<div id="alert-box" :class='this.$store.state.alert.type'>
			<h3>{{this.$store.state.alert.message}}</h3>
		</div>
	</transition>
</template>

<script>
export default {
	mounted() {
		const vanish = setTimeout(() => {
			this.$store.dispatch('setAlert', null);
			clearTimeout(vanish);
		}, 5000);
	},
};
</script>

<style lang='scss'>
@import '~vars';
#alert-box {
	width: 80vw;
	background-color: rgb(255, 213, 136);
	border: 2px solid rgb(247, 179, 54);
	color: rgb(247, 179, 54);
	text-align: center;
	position: fixed;
	top: 5%;
	left: 10%;

	&.error {
		background-color: $color-error-background;
		border: 2px solid $color-error;
		color: $color-error;
	}
	&.alert {
		background-color: rgb(255, 213, 136);
		border: 2px solid rgb(247, 179, 54);
		color: rgb(247, 179, 54);
	}
	&.succes {
		background-color: $color-succes-background;
		border: 2px solid $color-succes;
		color: $color-succes;
	}
}
.alert-enter-enter,
.alert-enter-leave-to {
	opacity: 0;
	transform: translateY(-100%);
}

.alert-enter-enter-active,
.alert-enter-leave-active {
	transition: all 0.3s ease;
}
</style>
