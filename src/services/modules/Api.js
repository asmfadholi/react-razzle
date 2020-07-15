import axios from 'axios';

export default {
  generateApi () {
    const api = axios.create({
      headers: {
        'Content-Type': 'application/json'
      }
    })
    api.interceptors.response.use(
      function (response) {
        return response
      },
      function (error) {
        return Promise.reject(error)
      }
    )
    return api
  }
}
