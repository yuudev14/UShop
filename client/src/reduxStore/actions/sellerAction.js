import axios from 'axios';
import { SET_SELLER_PRODUCT } from '../actions/types';
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