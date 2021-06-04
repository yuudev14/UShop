import axios from 'axios';
import { SET_SELLER_PRODUCT,DELETE_SELLER_PRODUCT } from '../actions/types';


export const getSellerProductAction = () => {
    return async(dispatch) => {
        console.log('hi')
        try {
            const sellerProducts = await axios.get('/sell-ushop/view-product', {headers : {token : JSON.parse(localStorage.getItem('UShop')).token}});
            dispatch({
                type: SET_SELLER_PRODUCT,
                data : sellerProducts.data
            })
        } catch (error) {
            console.log(error);
            
        }

    }
}

export const deleteProductAction = (product_id) => {
    return async(dispatch) => {
        try {
            const requestDeleteProduct = await axios.delete(`/sell-ushop/delete-product/${product_id}`, {headers : {token : JSON.parse(localStorage.getItem('UShop')).token}});
            if(requestDeleteProduct.data === true){
                dispatch({
                    type : DELETE_SELLER_PRODUCT,
                    product_id
                })
            }
            
        } catch (error) {
            console.log(error)
            
        }
    }
}