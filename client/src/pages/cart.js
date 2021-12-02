import React, { useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import "../styles/buyPage/cart.scss";
import HomeProductList from "../components/home/homeProductList";
import CartProduct from "../components/cart/cartProduct";
import OrderForm from "../components/cart/orderForm";
import {
  getUshopProductListAction,
  resetProductListAction,
} from "../reduxStore/actions/ushopAction";
import { Redirect } from "react-router-dom";
import { checkAllCartAction } from "../reduxStore/actions/cartAction";

const Cart = () => {
  const productLists = useSelector((state) => state.ushopProductLists);
  const auth = useSelector((state) => state.cart);
  const cart = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUshopProductListAction(productLists.length, "popular"));
    return () => {
      dispatch(resetProductListAction());
    };
  }, []);

  return (
    <div className="cart">
      {auth.isAuth === false && <Redirect to="/auth" />}
      <div className="cartContainer">
        <div className="cartList">
          <div className="cartHeader">
            <label>
              <input
                type="checkBox"
                onChange={() => dispatch(checkAllCartAction())}
                checked={cart.every((prod) => prod.checked)}
              />{" "}
              select all {cart.filter((prod) => prod.stock !== 0).length} items
            </label>
            <button className="fa fa-trash">Delete</button>
          </div>
          <div className="cartProducts">
            <CartProduct />
          </div>
        </div>
        <OrderForm />
      </div>
      <h1>For You</h1>
      <HomeProductList />
    </div>
  );
};

export default Cart;
