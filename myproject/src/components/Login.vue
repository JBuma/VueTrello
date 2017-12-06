<template>
  <div id='app-login'>
    <div class='loginPhoto'></div>
    <div class='loginForm'>
      <h1>login</h1>
      <div v-if="error" class='error'>{{error}}</div>
      <input v-on:keyup.enter='login' v-model="email" type='text' name='email' placeholder='email' />
      <input v-on:keyup.enter='login' v-model="password" type='password' name='password' placeholder='Password' />
      <button @click='login'>Submit</button>
    </div>
  </div>
</template>
<script>
  import authentication from '../services/authentication'
  export default {
    data() {
      return {
        email: '',
        password: '',
        error: null
      }
    },
    methods: {
      async login() {
        try {
          const response = await authentication.login({
              email: this.email,
              password: this.password
            })
            this.$store.dispatch('setToken',response.data.token)
            this.$store.dispatch('setUser',response.data.user)
            this.$router.push('/projects')
        } catch (err) {
              this.error = err.response.data.error
        }
      }
    }
  }

</script>
<style>

  .error {
    background-color: #D50000;
    color: white;
    /* border-radius:5px; */
    padding: 5px;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
  }

  #app-login {
    background-color: white;
    max-width: 1000px;
    margin: 15vh auto;
    display: flex;
    height: 65vh;
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2);
    font-family: 'Raleway', sans-serif;
    color: #111;
  }

  #app-login .loginPhoto {
    background-color: #018E4C;
    background: url('../assets/img/0fff4457606293.59dcb0946ca86.jpg');
    background-size: contain;
    background-repeat: no-repeat;
    width: 50%;
    height: 100%;
    /* z-index:1; */
  }

  .loginForm {
    margin: 0 auto;
    width: 50%;
    padding-left: 5%;
    padding-right: 5%;
    display: flex;
    flex-direction: column;
  }

  .loginForm h1 {
    font-weight: 200;
    font-size: 60px;
  }

  input[type='text'],
  input[type='email'],
  input[type='password'] {
    border: none;
    padding: 5px;
    margin-top: 15px;
    margin-bottom: 15px;
    border-bottom: 2px solid #EEE;
    font-size: 22px;
    font-family: 'Raleway';
    transition: 0.2s ease-out;
  }

  input[type='text']:focus,
  input[type='email']:focus,
  input[type='password']:focus {
    border-bottom: 2px solid #018E4C;
  }

  button {
    border-style: none;
    background: #11998e;
    /* fallback for old browsers */
    background: -webkit-linear-gradient(to left, #38ef7d, #11998e);
    /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to left, #38ef7d, #11998e);
    /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    color: white;
    padding: 12px 24px;
    border-radius: 25px;
    font-family: 'Raleway';
    font-size: 22px;
    /* font-weight:700; */
    letter-spacing: 1px;
    transition: 0.2s ease-out;
    box-shadow: 0px 5px 20px 2px rgba(0, 50, 0, 0.4)
  }

  button:hover,
  button:focus {
    background-color: teal;
    box-shadow: 0px 3px 10px 0px rgba(0, 50, 0, 0.6);
    /* top:-222px; */
  }

  @media screen and (max-width:1000px){
    .loginPhoto{
      display:none;
    }
    #app-login{
      max-width:500px;
    }
  }

</style>
