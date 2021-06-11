import axios from 'axios';
import { SET_AUTH } from './types';


export const registerAction = (data) => {
    return async(dispatch) => {
        try {
            const registerRequest = await axios.post('/auth/register', data);
            localStorage.setItem('UShop', JSON.stringify(registerRequest.data))
            dispatch({
                type : SET_AUTH,
                data : {
                    isAuth : true,
                }
            });
        } catch (error) {
            throw error.response.data
        }
    }
}

export const loginAction = (data) => {
    return async(dispatch) => {
        try {
            const loginRequest = await axios.post('/auth/login', data);
            localStorage.setItem('UShop', JSON.stringify(loginRequest.data))
            dispatch({
                type : SET_AUTH,
                data : {
                    isAuth : true,
                }
            });
        } catch (error) {
            throw error.response.data
        }
    }
}

export const logoutAction = () => {
    return async(dispatch) => {
        localStorage.removeItem('UShop');
        dispatch({
            type : SET_AUTH,
            data : {
                isAuth : false
            }
        })
    }
}

export const verifyHasShop = () => {
    return async(dispatch) => {
        try {
            const uShoptoken = JSON.parse(localStorage.getItem('UShop'));
            let auth;
            if(uShoptoken){
                const verifySellerRequest = await axios.get('/auth/has-shop',
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
                    hasShop : auth,
                }
            });
            

            
        } catch (error) {
            console.log(error.response.data)
            dispatch({
                type : SET_AUTH,
                data : {
                    hasShop : false,
                }
            });
            
        }
    }

}
export const verifyToken = () => {
    return async(dispatch) => {
        try {
            const uShoptoken = JSON.parse(localStorage.getItem('UShop'));
            let auth;
            if(uShoptoken){
                const verifySellerRequest = await axios.post('/auth/verify-token',
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
                }
            });
            

            
        } catch (error) {
            console.log(error.response.data)
            dispatch({
                type : SET_AUTH,
                data : {
                    isAuth : false,
                }
            });
            
        }
    }
}

