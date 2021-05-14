import axios from 'axios';

export const registerSellerAction = (data) => {
    return async(dispatch) => {
        try {
            const registerRequest = await axios.post('/sellerAuth/register', data);
        } catch (error) {
            throw error.response.data
        }
    }
}