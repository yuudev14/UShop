import { CHECK_ALL_CART, CHECK_CART, RESET_CART, SET_CART, UPDATE_ITEM_NO_CART } from "../actions/types";

const initState = []

const cartReducer = (state = initState, action) => {
    switch(action.type){
        case SET_CART:
            return action.data;
        case RESET_CART:
            return []
        case CHECK_ALL_CART:
            const updatedCart3 = [...state].map(cart => {
                cart.checked = !cart.checked
                
                return cart
            })
            return [...updatedCart3]

        case CHECK_CART:
            const updatedCart = [...state].map(cart => {
                if(action.id === cart.product_id){
                    cart.checked = !cart.checked
                }
                return cart
            })
            return [...updatedCart]
        case UPDATE_ITEM_NO_CART:
            const updatedCart2 = [...state].map(cart => {
                if(action.id === cart.product_id){
                    cart.items = action.data > cart.stock ? cart.stock : action.data < 0 ? 0 : action.data;
                    cart.totalPrice = cart.items * cart.price;
                }
                return cart
            })
            return [...updatedCart2]

        default:
            return state;
    }
}

export default cartReducer;