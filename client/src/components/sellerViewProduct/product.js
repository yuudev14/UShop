import React from "react";
import { deleteProductAction } from "../../reduxStore/actions/sellerAction";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

const SellerProduct = (props) => {
  const { data } = props;
  const dispatch = useDispatch();

  const deleteProduct = () => {
    dispatch(deleteProductAction(data.product_id));
  };

  return (
    <div className="productContainer">
      <Link to={`/sell-UShop/product/${data.product_id}`}>
        <div className="prev-img">
          <img src={data.image} alt="prev" />
        </div>
      </Link>
      <div className="productInfo">
        <Link to={`/sell-UShop/product/${data.product_id}`}>
          <h3>{data.product_name}</h3>
        </Link>
        <div className="priceNstock">
          <p className="price">price: ¥{data.price}</p>
          <p className="stock">Stock: {data.stock}</p>
        </div>
        <div className="viewHeartSales">
          <i className="fa fa-eye"> {data.seen}</i>
          <i className="fa fa-heart"> {data.heart}</i>
          <p> Sales 0</p>
        </div>
      </div>

      <div className="productOption">
        <Link to={`/sell-UShop/manage-product/${data.product_id}`}>
          <button className="fa fa-edit"></button>
        </Link>
        <div></div>
        <button onClick={deleteProduct} className="fa fa-trash"></button>
      </div>
    </div>
  );
};

export default SellerProduct;
