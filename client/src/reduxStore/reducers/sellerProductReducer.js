import { DELETE_SELLER_PRODUCT, SET_SELLER_PRODUCT } from "../actions/types";

const initState = [];

const sellerProductReducer = (state = initState, action) => {
    switch(action.type){
        case SET_SELLER_PRODUCT:
            return action.data;
        case DELETE_SELLER_PRODUCT:
            return [...state].filter(prod => prod.product_id !== action.product_id);
        default:
            return state;
    }
}

export default sellerProductReducer;