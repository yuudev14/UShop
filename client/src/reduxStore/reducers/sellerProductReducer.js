import { SET_SELLER_PRODUCT } from "../actions/types";

const initState = [];

const sellerProductReducer = (state = initState, action) => {
    switch(action.type){
        case SET_SELLER_PRODUCT:
            return action.data
        default:
            return state;
    }
}

export default sellerProductReducer;