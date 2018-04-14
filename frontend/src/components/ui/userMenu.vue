<template>
	<sideMenu ref='menu' position='right' id='user-menu' >
		<div slot="header" class='user'>
			<h3>{{this.$store.state.user.username}}</h3>
		</div>
		<div slot="body" >
			<strong></strong>
			<ul class="menu-list">
				<li @click='navTo({name:"projects"})'>
					<i class="fas fa-list-ul"></i>Projects
				</li>
				<li>
					<i class="fas fa-cogs"></i>Settings
				</li>
				<li @click='logout'>
					<i class="fas fa-sign-out-alt"></i>Logout
				</li>
			</ul>
		</div>
	</sideMenu>
</template>

<script>
import sideMenu from './sideMenu';
export default {
	components: {
		sideMenu,
	},
	methods: {
		toggleMenu() {
			this.$refs.menu.toggleMenu();
		},
		logout() {
			this.$store.dispatch('setToken', null);
			this.$store.dispatch('setUser', null);
			this.navTo({ name: 'home' });
			this.toggleMenu();
		},
		navTo(route) {
			this.toggleMenu();
			this.$router.push(route);
		},
	},
};
</script>

<style lang='scss'>
@import '~vars';
#user-menu .side-menu {
	.header {
		background-color: $color-primary;
		color: $text-alt;
		.user {
			padding: $padding-medium;
		}
	}
	.body {
		background-color: $color-background-light;
		// padding: $padding-medium;

		.menu-list {
			list-style: none;
			margin: 0;
			padding: 0;
			// margin-left: $padding-medium;
			li {
				padding: $padding-medium;

				i {
					width: 20px;
					height: 20px;
					margin-right: $padding-medium;
				}

				&:hover {
					background-color: $color-accent;
					cursor: pointer;
					color: $text-alt;
				}
			}
		}
	}
}
</style>
