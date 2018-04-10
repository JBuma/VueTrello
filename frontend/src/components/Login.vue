<template>
	<div id='app-login'>
		<div class='form'>
			<h1 class='form-title'>Login</h1>
			<div v-if="error" class='error'>{{error}}</div>
			<div class="form-group">
				<label for="login-email">Email</label>
				<input id='login-email' v-on:keyup.enter='login' v-model="email" type='text' name='email' placeholder='Email' />
			</div>
			<div class="form-group">
				<label for="login-password">Password</label>
				<input id='login-password' v-on:keyup.enter='login' v-model="password" type='password' name='password' placeholder='Password' />
			</div>
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
				const response = await authentication
					.login({
						email: this.email,
						password: this.password,
					})
					.then(res => {
						this.$store.dispatch('setToken', response.data.token);
						this.$store.dispatch('setUser', response.data.user);
						this.$router.push('/projects');
					});
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
	display: flex;
	justify-content: center;
	align-items: center;

	.form {
		width: 100%;
		max-width: 800px;
		margin: 0 auto;
		min-height: 50%;
		max-height: 75%;
		padding-left: $padding-huge;
		padding-right: $padding-huge;
		display: flex;
		flex-flow: column wrap;
		box-shadow: $box-shadow--large $box-shadow--color-default;

		.form-group {
			display: flex;
			flex-flow: column wrap;
		}

		.form-title {
			font-weight: 200;
			font-size: 60px;
		}
	}
}
</style>
