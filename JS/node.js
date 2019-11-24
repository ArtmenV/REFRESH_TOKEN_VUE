npm install axios-auth-refresh


//code


import createAuthRefreshInterceptor from 'axios-auth-refresh'

// import endpoints from './api/index'

const refreshAuthLogic = failedRequest => axios.post('http://rmcs.loc/api/token/refresh',{
  refresh_token: localStorage.getItem('refresh-token')
}).then(tokenRefreshResponse => {
  const refreshToken = tokenRefreshResponse.data.refresh_token
  const token = tokenRefreshResponse.data.token

  localStorage.setItem('refresh-token', refreshToken)
  localStorage.setItem('user-token', token)

  store.commit('SET_TOKEN', token)

  failedRequest.response.config.headers['Authorization'] = 'Bearer ' + token
  return Promise.resolve();
});

axios.interceptors.request.use(request => {
  const token = localStorage.getItem('user-token')

  if (token){
    request.headers['Authorization'] = 'Bearer ' + token
  }
  return request;
});