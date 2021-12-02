import {
  RESET_USHOP_PRODUCT,
  SET_USHOP_PRODUCT,
  SEE_MORE_USHOP_PRODUCT,
} from "../actions/types";

const initState = [];

const productListReducer = (state = initState, action) => {
  switch (action.type) {
    case SEE_MORE_USHOP_PRODUCT:
      return [...state, ...action.data];
    case SET_USHOP_PRODUCT:
      return action.data;

    case RESET_USHOP_PRODUCT:
      return [];
    default:
      return state;
  }
};

export default productListReducer;
