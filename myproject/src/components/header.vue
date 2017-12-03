<template>
	<nav id='navHeader'>
		<div class='menu item link' @click="navTo({name:'home'})" id='logo'>LOGO</div>
		<div class='menu items'>
			<div @click='navTo({name:"login"})' class='menu item link'>Login</div>
			<div @click='navTo({name:"register"})' class='menu item link'>Signup</div>
		</div>
	</nav>
</template>
<script>
	export default {
		data() {
			return {
			}
		},
		methods:{
			navTo (route){
				this.$router.push(route);
			},
			makeRequest (route){
				this.$http.get('http://localhost:3000/isLoggedIn')
				.then(function(data){
					console.log('Userdata: ',data)
				})
			}
		}

	}
</script>
<style>
	#navHeader{
		background-color:#018E4C;
		color:white;
		display:flex;
		justify-content:space-between;
	}
	#logo{
		padding:20px;
	}
	.menu.items{
		display:flex;
		justify-content:center;
		align-items:center;
	}
	.menu.item{
		padding:20px;
	}
	.menu.item:hover{
		background-color:#007070;
	}
	.link{
		cursor:pointer;
	}
</style>