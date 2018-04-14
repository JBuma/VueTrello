<template>
	<div id="app">
		<alertBox v-if="this.$store.state.alert"/>
		<navHeader @open-menu='openMenu' ></navHeader>
		<router-view></router-view>
		<side-menu ref='user' position='right' v-if="this.$store.state.isUserLoggedIn" />
	</div>
</template>

<script>
import navHeader from './components/header.vue';
import alertBox from './components/ui/alertBox.vue';
import sideMenu from './components/ui/sideMenu.vue';

export default {
	components: {
		navHeader,
		alertBox,
		sideMenu,
	},
	name: 'app',
	data() {
		return {};
	},
	methods: {
		openMenu(name) {
			this.$refs[name].toggleMenu();
		},
	},
};
</script>

<style lang='scss'>
@import '~vars';
body,
html,
* {
	font-family: 'Raleway', sans-serif;
}

*,
*::before,
*::after {
	box-sizing: border-box;
}

html,
body {
	font-size: 16px;
	margin: 0;
}

#app {
	min-height: 100%;
	min-height: 100vh;
	display: grid;
	grid-template-rows: 70px 1fr;
}
//Global Styles
input[type='text'],
input[type='email'],
input[type='password'] {
	font-size: 16px;
	border: none;
	padding: $padding-small;
	margin-top: $padding-medium;
	margin-bottom: $padding-medium;
	border-bottom: 2px solid #eee;
	transition: $transition-fast;
}

input[type='text']:focus,
input[type='email']:focus,
input[type='password']:focus {
	border-bottom: 2px solid $color-primary;
}

button {
	border-style: none;
	background: $color-accent;
	color: white;
	padding: $padding-medium $padding-large;
	border-radius: $border-radius--huge;
	font-size: $text-large;
	letter-spacing: 1px;
	transition: $transition-fast;
	box-shadow: $box-shadow--tiny rgba(0, 50, 0, 0.4);

	&:focus,
	&:hover {
		background-color: teal;
		box-shadow: 0px 3px 10px 0px rgba(0, 50, 0, 0.6);
	}
	&.red {
		background-color: $color-error;
	}
	&.green {
		background-color: $color-succes;
	}
}
</style>
