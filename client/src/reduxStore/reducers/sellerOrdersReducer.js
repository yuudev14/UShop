import { RESET_SELLER_ORDERS, SET_SELLER_ORDERS } from "../actions/types"

const initState = []

const sellerOrdersReducer = (state = initState, action) => {
    switch(action.type){
        case SET_SELLER_ORDERS:
            return action.data
        case RESET_SELLER_ORDERS:
            return []
        default:
            return state
    }
}

export default sellerOrdersReducer