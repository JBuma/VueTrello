<template>
	<nav id='navHeader'>
		<div class='menu item link' @click="navTo({name:'home'})" id='logo'>LOGO</div>
		<div v-if='!$store.state.isUserLoggedIn' class='menu items'>
			<div @click='navTo({name:"login"})' class='menu item link'>Login</div>
			<div @click='navTo({name:"register"})' class='menu item link'>Signup</div>
		</div>
		<div v-if='$store.state.isUserLoggedIn' class='menu items'>
			<div @click="openMenu('user')" class='menu item link'>Welcome, {{$store.state.user.username}}</div>
		</div>
	</nav>
</template>
<script>
export default {
	data() {
		return {};
	},
	methods: {
		navTo(route) {
			this.$router.push(route);
		},
		// makeRequest(route) {
		// 	this.$http
		// 		.get('http://localhost:3000/isLoggedIn')
		// 		.then(function(data) {
		// 			console.log('Userdata: ', data);
		// 		});
		// },
		openMenu(name) {
			this.$emit('open-menu', name);
		},
	},
};
</script>
<style lang='scss'>
@import '~vars';
#navHeader {
	background-color: $color-primary;
	color: $text-alt;
	display: flex;
	justify-content: space-around;
}
.menu.items {
	display: flex;
	justify-content: center;
	align-items: center;
}
.menu.item {
	padding: $padding-large;
	height: 70px;
}
.menu.item:hover {
	background-color: $color-primary-light;
}
.link {
	cursor: pointer;
}
</style>
