import { combineReducers } from 'redux';
import authReducer from './authReducer';
import sellerProductReducer from './sellerProductReducer';


const rootReducer = combineReducers({
    auth : authReducer,
    sellerProducts : sellerProductReducer

});

export default rootReducer;