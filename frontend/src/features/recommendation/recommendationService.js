import axios from 'axios'

const API_URL = '/api/recommendations/'


// create new recommendation 
const createRecommendation = async (recommendationData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    
    console.log('feeling type;', recommendationData)
    const response = await axios.post(API_URL, recommendationData, config);
    console.log('response from createRecommendation', response)
    return response.status === 204 ? response.status : response.data
  };

// update recommendation 
const updateRecommendation = async (recommendationData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    console.log('recommendation data!!!: ', recommendationData)
    const response = await axios.put(API_URL + recommendationData.id , recommendationData, config);

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
    updateRecommendation,
    createRecommendation,
    getRecommendations
}

export default recommendationService