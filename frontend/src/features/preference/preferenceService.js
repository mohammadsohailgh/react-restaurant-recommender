import axios from 'axios'

const API_URL = '/api/users/preference/'

// Update user preference 
const updatePreference = async (preferenceData, userId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.put(API_URL + userId, preferenceData, config);
    return response.data;
  };


// Get user preference
const getPreference = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(API_URL, config)
    return response.data
}

const preferenceService = {
    updatePreference,
    getPreference,
}

export default preferenceService