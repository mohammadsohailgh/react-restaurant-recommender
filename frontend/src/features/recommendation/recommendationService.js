import axios from 'axios'

const API_URL = '/api/recommendations/'

// create new recommendation 
const createRecommendation = async (recommendationData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL, recommendationData, config);

    return response.data
  };


// Get user recommendations
const getRecommendations = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(API_URL, config)
    return response.data
}


const recommendationService = {
    createRecommendation,
    getRecommendations
}

export default recommendationService