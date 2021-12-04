import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import ProductDetails from "../components/productDetail";
import BuyerProductDetailOptions from "../components/buyerProductDetailOptions";
import "../styles/buyPage/buyerProductDetail.scss";

const BuyerProductDetails = () => {
  const [productInfo, setProductInfo] = useState({
    product_id: "",
    productName: "",
    category: "",
    price: null,
    images: [],
    description: "",
    stock: null,
    follows: null,
  });

  const { product_id } = useParams();
  const history = useHistory();

  const getProductInfo = async () => {
    try {
      const productDetails = await axios.get(
        `/ushop/get-product-info/${product_id}`,
        { headers: { token: JSON.parse(localStorage.getItem("UShop")).token } }
      );
      const data = productDetails.data;
      setProductInfo({
        ...productInfo,
        images: data.images,
        sampleImages: data.images,
        productName: data.product_name,
        ...data,
      });
    } catch (error) {
      console.log(error.response);
      history.push("/");
    }
  };
  useEffect(() => {
    getProductInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <ProductDetails
        productInfo={productInfo}
        Option={BuyerProductDetailOptions}
      />
    </>
  );
};

export default BuyerProductDetails;
