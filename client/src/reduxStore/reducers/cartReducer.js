import { SET_CART } from "../actions/types";

const initState = []

const cartReducer = (state = initState, action) => {
    switch(action.type){
        case SET_CART:
            return action.data;
        default:
            return state;
    }
}

export default cartReducer;