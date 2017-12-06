<template>
	<nav id='navHeader'>
		<div class='menu item link' @click="navTo({name:'home'})" id='logo'>LOGO</div>
		<div v-if='!$store.state.isUserLoggedIn' class='menu items'>
			<div @click='navTo({name:"login"})' class='menu item link'>Login</div>
			<div @click='navTo({name:"register"})' class='menu item link'>Signup</div>
		</div>
		<div v-if='$store.state.isUserLoggedIn' class='menu items'>
			<div @click='navTo({name:"projects"})' class='menu item link'>Welcome, {{$store.state.user.email}}</div>
			<div @click='logout()' class='menu item link'>Logout</div>
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
			},
			logout(){
				this.$store.dispatch('setToken',null)
				this.$store.dispatch('setUser',null)
				this.$router.push({name: 'home'})
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