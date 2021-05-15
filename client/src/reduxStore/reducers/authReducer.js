import { SET_AUTH } from "../actions/types";

const initState = {
    isAuth : null,
}

const authReducer = (state = initState, action) => {
    switch(action.type){
        case SET_AUTH:
            return action.data
        default:
            return state;
    }
}

export default authReducer