import axios from "axios";
import {
  CHECK_ALL_CART,
  CHECK_CART,
  RESET_CART,
  SET_CART,
  UPDATE_ITEM_NO_CART,
} from "./types";

export const getCartProductAction = () => {
  return async (dispatch) => {
    try {
      const ushop = JSON.parse(localStorage.getItem("UShop"));
      if (ushop) {
        const cartProduct = await axios.get("/cart/get-cart", {
          headers: { token: JSON.parse(localStorage.getItem("UShop")).token },
        });
        const prod = cartProduct.data.map((prod) => {
          prod.totalPrice = prod.price;
          prod.checked = false;
          return prod;
        });
        dispatch({
          type: SET_CART,
          data: prod,
        });
      } else {
        dispatch({
          type: SET_CART,
          data: [],
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const checkProductAction = (product_id) => {
  return {
    type: CHECK_CART,
    id: product_id,
  };
};

export const updateItemNumberAction = (value, id) => {
  console.log(value, id);
  return {
    type: UPDATE_ITEM_NO_CART,
    data: value,
    id,
  };
};

export const deleteCartAction = (id) => {
  return async (dispatch) => {
    const product = await axios.delete(`/cart/delete-cart/${id}`, {
      headers: { token: JSON.parse(localStorage.getItem("UShop")).token },
    });
    const prod = product.data.map((prod) => {
      prod.totalPrice = prod.price;
      prod.checked = false;
      return prod;
    });
    dispatch({
      type: SET_CART,
      data: prod,
    });
  };
};

export const resetCartAction = () => {
  return {
    type: RESET_CART,
  };
};

export const checkAllCartAction = () => {
  return {
    type: CHECK_ALL_CART,
  };
};

export const addCartAction = (product_id) => {
  return async (dispatch) => {
    try {
      const product = await axios.post(
        "/cart/add-cart",
        { product_id },
        { headers: { token: JSON.parse(localStorage.getItem("UShop")).token } }
      );
      const prod = product.data.map((prod) => {
        prod.totalPrice = prod.price;
        prod.checked = false;
        return prod;
      });
      dispatch({
        type: SET_CART,
        data: prod,
      });
    } catch (error) {
      console.log(error.response.data);
    }
  };
};

export const checkOutAction = (data) => {
  return async (dispatch) => {
    try {
      const checkout = await axios.post(
        "/ushop/checkout",
        { buyItems: data },
        { headers: { token: JSON.parse(localStorage.getItem("UShop")).token } }
      );
      if (checkout.data) {
        const cartProduct = await axios.get("/cart/get-cart", {
          headers: { token: JSON.parse(localStorage.getItem("UShop")).token },
        });
        const prod = cartProduct.data.map((prod) => {
          prod.totalPrice = prod.price;
          prod.checked = false;
          return prod;
        });
        dispatch({
          type: SET_CART,
          data: prod,
        });
        return true;
      }
    } catch (error) {
      console.log(error.response);
    }
  };
};
