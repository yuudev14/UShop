import { SET_CART } from "./types"

export const setCartAction = () => {
    const ushop = JSON.parse(localStorage.getItem('UShop'))
    let data;
    if(ushop){
        if(ushop.hasOwnProperty('cart')){
            data  = ushop.cart
        }
        else{
            data  = []
        }
    }else{
        data  = ushop.cart
    }
    return {
        type : SET_CART,
        data
    }
}