import axios from 'axios'
import { getToken, setToken, tokenIsValid } from './auth'


const axiosAuth = axios.create()

// Interceptors are a way for us to execute a callback function just before a request is sent
// In this example, we are going to intercept every request sent with axiosAuth, and add the current access token to the headers
axiosAuth.interceptors.request.use(async (config) => {

  // Check whether the access token has expired
  if (!tokenIsValid('access-token')){
    
    // If it has expired, check to see whether the refresh token has expired
    if (tokenIsValid('refresh-token')){

      // If the refresh token is valid, we will use this to get a new access token, saving this to storage
      const { data } = await axios.post('/api/auth/refresh/', {
        refresh: getToken('refresh-token'),
      })

      setToken('access-token', data.access)

    } else {
      // If the refresh token is also expired, cancel the request
      throw new axios.Cancel('Session expired, please log in again.')
    }
  }
  

  // Add the authorization header to the config before sending
  config.headers.Authorization = `Bearer ${getToken('access-token')}`

  return config
})


// At the end of the file, export the instance we created under axiosAuth for use in our application
export default axiosAuth