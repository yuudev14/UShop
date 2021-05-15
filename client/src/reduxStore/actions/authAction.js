import axios from 'axios';
import { SET_AUTH } from './types';


export const registerSellerAction = (data) => {
    return async(dispatch) => {
        try {
            const registerRequest = await axios.post('/sellerAuth/register', data);
            localStorage.setItem('UShop', JSON.stringify(registerRequest.data))
            dispatch({
                type : SET_AUTH,
                data : {
                    isAuth : true,
                    type : 'seller'
                }
            });
        } catch (error) {
            throw error.response.data
        }
    }
}

export const loginSellerAction = (data) => {
    return async(dispatch) => {
        try {
            const loginRequest = await axios.post('/sellerAuth/login', data);
            localStorage.setItem('UShop', JSON.stringify(loginRequest.data))
            dispatch({
                type : SET_AUTH,
                data : {
                    isAuth : true,
                    type : 'seller'
                }
            });
        } catch (error) {
            throw error.response.data
        }
    }
}

export const verifySellerToken = () => {
    return async(dispatch) => {
        try {
            const uShoptoken = JSON.parse(localStorage.getItem('UShop'));
            let auth;
            if(uShoptoken){
                const verifySellerRequest = await axios.post('/sellerAuth/verify-seller',
                                                    {}, 
                                                    {headers : {
                                                        token : uShoptoken.token
                                                    }});
                auth = true
            }else{
                auth = false

            }
            dispatch({
                type : SET_AUTH,
                data : {
                    isAuth : auth,
                    type : 'seller'
                }
            });
            

            
        } catch (error) {
            console.log(error.response.data)
            dispatch({
                type : SET_AUTH,
                data : {
                    isAuth : false,
                    type : 'seller'
                }
            });
            
        }
    }
}