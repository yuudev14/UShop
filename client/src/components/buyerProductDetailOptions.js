import React, { Fragment } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { addCartAction } from "../reduxStore/actions/cartAction";

const BuyerProductDetailOptions = () => {
  const { product_id } = useParams();
  const dispatch = useDispatch();
  const addToCart = () => {
    dispatch(addCartAction(product_id));
  };
  return (
    <Fragment>
      <button onClick={addToCart} className="fa fa-shopping-cart"></button>
      <button></button>
    </Fragment>
  );
};

export default BuyerProductDetailOptions;
