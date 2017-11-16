<template>
	<nav id='navHeader'>
		<div id='logo'>LOGO</div>
		<div class='menu items'>
			<div @click="navTo({name:'home'})" class='menu item link'>Home</div>
			<div class='menu item link'>About</div>
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