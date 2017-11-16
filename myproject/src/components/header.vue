<template>
	<nav id='navHeader'>
		<div id='logo'>LOGO</div>
		<div class='menu items'>
			<div class='menu item'>Home</div>
			<div class='menu item'>About</div>
		</div>
	</nav>
</template>
<script>
	export default {
		data() {
			return {
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
</style>