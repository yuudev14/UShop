import { SET_BUYER_ORDERS } from "../actions/types";

const initState = [];

const buyerOrderReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_BUYER_ORDERS:
      return action.data;
    default:
      return state;
  }
};

export default buyerOrderReducer;
