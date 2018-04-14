<template>
	<sideMenu>
		<div slot="header">
			<h1>{{this.$store.state.user.email}}</h1>
		</div>
	</sideMenu>
</template>

<script>
import sideMenu from './sideMenu';
export default {
	components: {
		sideMenu,
	},
};
</script>

<style>
</style>
