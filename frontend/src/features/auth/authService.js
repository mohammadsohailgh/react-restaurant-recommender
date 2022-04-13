import axios from 'axios'

const API_URL = '/api/users/'

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL, userData)
  console.log('authService hit')
  console.log(response)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + 'login', userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

// Logout user
const logout = () => {
  localStorage.removeItem('user')
}

// Get user data
const getUserData = async (token) => {
  console.log("authService token: ", token)
  const config = {
    headers: {
        Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(API_URL + 'me', config)

  console.log('response data: ', response.data)
  console.log('response pref: ', response.data.preference)

  // if (response.data) {
  //   localStorage.setItem('user', JSON.stringify(response.data))
  // }

  return response.data
}


const authService = {
  register,
  logout,
  login,
  getUserData,
}

export default authService