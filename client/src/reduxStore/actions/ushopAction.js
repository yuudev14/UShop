import axios from 'axios';
import { SET_USHOP_PRODUCT } from './types';

export const getUshopProductListAction = () => {
    return async(dispatch) => {
        try {
            const products = await axios.get('/ushop/get-products');
            dispatch({
                type : SET_USHOP_PRODUCT,
                data : products.data
            })

            
        } catch (error) {
            console.log(error);
            
        }
    }

}