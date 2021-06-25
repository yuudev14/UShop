import axios from 'axios';
import { SET_SELLER_PRODUCT,DELETE_SELLER_PRODUCT, SET_AUTH, RESET_SELLER_PRODUCT, SET_SELLER_ORDERS, RESET_SELLER_ORDERS } from '../actions/types';

export const filterProductsAction = (data) => {
    return async(dispatch) => {
        try {
            const filteredProducts = await axios.post('/sell-ushop/filter-products', data, {headers : {token : JSON.parse(localStorage.getItem('UShop')).token}});
            dispatch({
                type: SET_SELLER_PRODUCT,
                data : filteredProducts.data
            })
            
        } catch (error) {
            console.log(error);
            
        }
    }
}

export const resetSellerProductsAction = () => {
    return {
        type: RESET_SELLER_PRODUCT,
    }
}
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

export const registerShopAction = (data) => {
    return async(dispatch) => {
        try {
            const requestRegisterShop = await axios.post('/sell-ushop/register-shop/', data, {headers : {token : JSON.parse(localStorage.getItem('UShop')).token}});
            if(requestRegisterShop.data === true){
                dispatch({
                    type : SET_AUTH,
                    data : {
                        hasShop : true,
                    }
                })
            }
            
        } catch (error) {
            throw error.response
            
        }
    }
}

export const sellerPendingOrdersAction = () => {
    return async(dispatch) => {
        try {
            const pending_orders = await axios.get('/sell-ushop/pending-orders',{headers : {token : JSON.parse(localStorage.getItem('UShop')).token}});
            dispatch({
                type: SET_SELLER_ORDERS,
                data: pending_orders.data
            })
        } catch (error) {
            throw error.response
            
        }

    }
}

export const resetPendingOrdersAction = () => {
    return {
        type : RESET_SELLER_ORDERS
    }
}