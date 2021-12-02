import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkOutAction } from "../../reduxStore/actions/cartAction";
import { useHistory } from "react-router-dom";

const OrderForm = () => {
  const history = useHistory();
  const cart = useSelector((state) =>
    state.cart.filter((prod) => prod.checked && prod.stock !== 0)
  );
  const total = cart.reduce((total, current) => {
    return total + current.totalPrice;
  }, 0);

  const dispatch = useDispatch();

  const checkout = async () => {
    try {
      if (cart.every((item) => item.items > 0)) {
        const checkout = await dispatch(checkOutAction(cart));
        if (checkout === true) {
          history.push("/");
        }
      } else {
        alert("you didn't buy anything in ");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="orderForm">
      <h1>Order Summary</h1>
      {cart.map((prod) => (
        <div className="orderInfo">
          <h5>
            {prod.product_name} ({prod.items}){" "}
          </h5>
          <p>¥{prod.totalPrice}</p>
        </div>
      ))}

      <div className="orderInfo total">
        <h5>total ({cart.length} items)</h5>
        <p>¥{total}</p>
      </div>
      <button onClick={checkout}>Proceed to checkout</button>
    </div>
  );
};

export default OrderForm;
