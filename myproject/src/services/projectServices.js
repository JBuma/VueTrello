import Api from './Api'
import Config from './config'

var baseUrl = Config.baseURL

export default {
  index(userId) {
    return Api().get(baseUrl  + userId + '/projects')
  },
  show(userId, projectId) {
    return Api().get(baseUrl  + userId + '/projects/' + projectId)
  },
  create(userId, info) {
    return Api().post(baseUrl + userId + '/projects/new', info)
  }
}
