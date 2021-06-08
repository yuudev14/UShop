import { combineReducers } from 'redux';
import authReducer from './authReducer';
import productListReducer from './productListReducer';
import sellerProductReducer from './sellerProductReducer';


const rootReducer = combineReducers({
    auth : authReducer,
    sellerProducts : sellerProductReducer,
    ushopProductLists : productListReducer,

});

export default rootReducer;