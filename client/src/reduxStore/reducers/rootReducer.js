import { combineReducers } from 'redux';
import authReducer from './authReducer';
import buyerOrderReducer from './buyerOrderReducer';
import cartReducer from './cartReducer';
import productListReducer from './productListReducer';
import sellerOrdersReducer from './sellerOrdersReducer';
import sellerProductReducer from './sellerProductReducer';


const rootReducer = combineReducers({
    auth : authReducer,
    sellerProducts : sellerProductReducer,
    ushopProductLists : productListReducer,
    cart : cartReducer,
    sellerOrders : sellerOrdersReducer,
    buyerOrders : buyerOrderReducer,

});

export default rootReducer;