import axios from 'axios';
import { RESET_USHOP_PRODUCT, SEE_MORE_USHOP_PRODUCT, SET_USHOP_PRODUCT } from './types';

export const getUshopProductListAction = (start, filter) => {
    return async(dispatch) => {
        try {
            const products = await axios.get(`/ushop/get-${filter}-products/0`);
            dispatch({
                type : SET_USHOP_PRODUCT,
                data : products.data
            })

            
        } catch (error) {
            console.log(error);
            
        }
    }

}


export const getShopProductsAction= (filter, shop_name) => {
    return async(dispatch) => {
        try {
            const products = await axios.post(`/ushop/get-${filter}-shops-product/0`, {shop_name});
            dispatch({
                type : SET_USHOP_PRODUCT,
                data : products.data
            })

            
        } catch (error) {
            console.log(error);
            
        }
    }

}

export const seeMoreShopProductsAction= (filter, shop_name, start) => {
    return async(dispatch) => {
        try {
            const products = await axios.post(`/ushop/get-${filter}-shops-product/${start}`, {shop_name});
            dispatch({
                type : SEE_MORE_USHOP_PRODUCT,
                data : products.data
            })

            
        } catch (error) {
            console.log(error);
            
        }
    }

}

export const seeMoreUshopProductListAction = (start, filter) => {
    return async(dispatch) => {
        try {
            const products = await axios.get(`/ushop/get-${filter}-products/${start}`);
            dispatch({
                type : SEE_MORE_USHOP_PRODUCT,
                data : products.data
            })

            
        } catch (error) {
            console.log(error);
            
        }
    }

}

export const resetProductListAction = () => {
    return{
        type : RESET_USHOP_PRODUCT,
        data : []
    }
}