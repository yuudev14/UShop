import axios from 'axios';
import { RESET_USHOP_PRODUCT, SEE_MORE_USHOP_PRODUCT, SET_BUYER_ORDERS, SET_USHOP_PRODUCT } from './types';

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


export const getUsersFollowProductsAction= (filter) => {
    return async(dispatch) => {
        try {
            const products = await axios.get(`/profile/${filter}-follow-products/0`, {headers : {token : JSON.parse(localStorage.getItem('UShop')).token}});
            dispatch({
                type : SET_USHOP_PRODUCT,
                data : products.data
            })

            
        } catch (error) {
            console.log(error);
            
        }
    }

}

export const getCategoryProductsAction= (filter, category) => {
    return async(dispatch) => {
        try {
            const products = await axios.post(`/ushop/get-${filter}-category-product/0`, {category}, {headers : {token : JSON.parse(localStorage.getItem('UShop')).token}});
            dispatch({
                type : SET_USHOP_PRODUCT,
                data : products.data
            })

            
        } catch (error) {
            console.log(error);
            
        }
    }

}

export const seeMoreCategoryProductsAction= (filter, category, start) => {
    return async(dispatch) => {
        try {
            const products = await axios.post(`/ushop/get-${filter}-category-product/${start}`, {category}, {headers : {token : JSON.parse(localStorage.getItem('UShop')).token}});
            dispatch({
                type : SET_USHOP_PRODUCT,
                data : products.data
            })

            
        } catch (error) {
            console.log(error);
            
        }
    }

}

export const seeMoreUsersFollowProductsAction = (filter, start) => {
    return async(dispatch) => {
        try {
            const products = await axios.get(`/profile/${filter}-follow-products/${start}`, {headers : {token : JSON.parse(localStorage.getItem('UShop')).token}});
            dispatch({
                type : SEE_MORE_USHOP_PRODUCT,
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

export const getAllOrdersAction = () => {
    return async(dispatch) => {
        try {
            const orders = await axios.get('/profile/all-orders', {headers : {token : JSON.parse(localStorage.getItem('UShop')).token}});
            dispatch({
                type : SET_BUYER_ORDERS,
                data : orders.data
            })
            
        } catch (error) {
            console.log(error);
            
        }
    }
}

export const getToShipOrdersAction = () => {
    return async(dispatch) => {
        try {
            const orders = await axios.get('/profile/to-ship-orders', {headers : {token : JSON.parse(localStorage.getItem('UShop')).token}});
            dispatch({
                type : SET_BUYER_ORDERS,
                data : orders.data
            })
            
        } catch (error) {
            console.log(error);
            
        }
    }
}

export const resetBuyerOrderAction = () => {
    return {
        type: SET_BUYER_ORDERS,
        data : []
    }
}