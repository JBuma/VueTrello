<template>
	<div id='app-register'>
		<div class='form'>
			<h1 class='form-title'>Register</h1>
			<div v-if="error" class='error'>{{error}}</div>
			<div class="form-group">
				<label for="register-email">Email</label>
				<input id='register-email' v-on:keyup.enter='register' v-model="email" type='text' name='email' placeholder='email' />
			</div>
			<div class="form-group">
				<label for="register-password">Password</label>
			<input id='register-password' v-on:keyup.enter='register' v-model="password" type='password' name='password' placeholder='Password' />
			</div>
			<button @click='register'>Submit</button>
		</div>
	</div>
</template>
<script>
import authentication from '../services/authentication';
import projectServices from '../services/projectServices';
import itemServices from '../services/itemServices';
export default {
	data() {
		return {
			email: '',
			password: '',
			error: null,
		};
	},
	methods: {
		async register() {
			try {
				const response = await authentication.register({
					email: this.email,
					password: this.password,
				});

				this.$store.dispatch('setToken', response.data.token);
				this.$store.dispatch('setUser', response.data.user);
				const project = await projectServices.create(
					response.data.user.id,
					{
						name: 'My First Project',
						description: 'Demo Project',
						authorId: response.data.user.id,
						content: 'empty',
					},
				);

				itemServices.create(project.data.id, {
					name: 'My First Item',
					ProjectId: project.data.id,
					authorId: response.data.user.id,
					description: 'EMPTY',
					dueDate: 'TOMORROW',
				});

				this.$router.push('/projects/' + project.data.id);
				// this.$router.push('project/'+response.data)
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
	background-color: #d50000;
	color: white;
	padding: 5px;
	box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
}

#app-register {
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
