<template>
	<div id='app-login'>
		<div class='loginForm'>
			<h1>Login</h1>
			<div v-if="error" class='error'>{{error}}</div>
			<label for="email">Email</label>
			<input v-on:keyup.enter='login' v-model="email" type='text' name='email' placeholder='Email' />
			<label for="password">Password</label>
			<input v-on:keyup.enter='login' v-model="password" type='password' name='password' placeholder='Password' />
			<button @click='login'>Submit</button>
		</div>
	</div>
</template>
<script>
import authentication from '../services/authentication';
export default {
	data() {
		return {
			email: '',
			password: '',
			error: null,
		};
	},
	methods: {
		async login() {
			try {
				const response = await authentication.login({
					email: this.email,
					password: this.password,
				});
				this.$store.dispatch('setToken', response.data.token);
				this.$store.dispatch('setUser', response.data.user);
				this.$router.push('/projects');
			} catch (err) {
				this.error = err.response.data.error;
			}
		},
	},
};
</script>
<style lang='scss'>
@import '~vars';
.error {
	background-color: $color-error;
	color: $text-alt;
	padding: $padding-small;
	box-shadow: $box-shadow--small $box-shadow--color-default;
}

#app-login {
	background-color: white;
	max-width: 600px;
	margin: 15vh auto;
	display: flex;
	min-height: 65vh;
	box-shadow: $box-shadow--large $box-shadow--color-default;
	color: $text-primary;

	.loginForm {
		margin: 0 auto;
		width: 100%;
		padding-left: $padding-huge;
		padding-right: $padding-huge;
		display: flex;
		flex-direction: column;
	}
}

.loginForm h1 {
	font-weight: 200;
	font-size: 60px;
}
</style>
