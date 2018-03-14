<template>
	<div id='app-register'>
		<div class='registerForm'>
			<h1>Register</h1>
			<div v-if="error" class='error'>{{error}}</div>
			<input v-on:keyup.enter='register' v-model="email" type='text' name='email' placeholder='email' />
			<input v-on:keyup.enter='register' v-model="password" type='password' name='password' placeholder='Password' />
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

				console.log('Response: ', response);
				console.log('Data: ', response.data);
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
<style>
.error {
	background-color: #d50000;
	color: white;
	padding: 5px;
	box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
}

#app-register {
	background-color: white;
	max-width: 1000px;
	margin: 15vh auto;
	display: flex;
	height: 65vh;
	box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2);
	font-family: 'Raleway', sans-serif;
	color: #111;
}

.registerForm {
	margin: 0 auto;
	width: 50%;
	padding-left: 5%;
	padding-right: 5%;
	display: flex;
	flex-direction: column;
}

.registerForm h1 {
	font-weight: 200;
	font-size: 60px;
}
</style>
