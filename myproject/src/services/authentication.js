import Api from './Api'

var baseUrl = 'http://localhost:3000/'

export default {
  register(info) {
    return Api().post(baseUrl+'register', info)
  },
  getter(){
    return Api().get('');
  },
  login(credentials){
    return Api().post(baseUrl+'login',credentials)
  }
}
