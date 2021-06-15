import { combineReducers } from 'redux';
import authReducer from './authReducer';
import cartReducer from './cartReducer';
import productListReducer from './productListReducer';
import sellerProductReducer from './sellerProductReducer';


const rootReducer = combineReducers({
    auth : authReducer,
    sellerProducts : sellerProductReducer,
    ushopProductLists : productListReducer,
    cart : cartReducer

});

export default rootReducer;