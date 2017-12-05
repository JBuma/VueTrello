import Api from './Api'
import Config from './config'

var baseUrl = Config.baseURL

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
