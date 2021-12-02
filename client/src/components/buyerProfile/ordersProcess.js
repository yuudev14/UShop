import React from "react";
import { Link } from "react-router-dom";

const OrdersProcess = () => {
  return (
    <div className="buyerProfileOrder">
      <div className="buyerProfileOrderHeader profileHeaders">
        <h1>Orders</h1>
        <Link to="/orders">View All</Link>
      </div>

      <ul className="orderProcess">
        <li>
          <Link>
            <i className="fa fa-money"></i>
            <h4>to pay</h4>
            <p>3</p>
          </Link>
        </li>
        <li>
          <Link to="/to-ship-orders">
            <i className="fa fa-envelope"></i>
            <h4>to ship</h4>
            <p>3</p>
          </Link>
        </li>
        <li>
          <Link>
            <i className="fa fa-truck"></i>
            <h4>to deliver</h4>
            <p></p>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default OrdersProcess;
