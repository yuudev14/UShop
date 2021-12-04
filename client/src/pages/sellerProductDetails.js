import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import SellerProductDetailOption from "../components/sellerProductDetailOption";
import ProductDetails from "../components/productDetail";

const SellerProductDetails = () => {
  const [productInfo, setProductInfo] = useState({
    product_id: "",
    productName: "",
    category: "",
    price: null,
    images: [],
    description: "",
    stock: null,
  });

  const { product_id } = useParams();
  const history = useHistory();

  const getProductInfo = async () => {
    try {
      const productDetails = await axios.get(
        `/sell-ushop/getProduct/${product_id}`,
        { headers: { token: JSON.parse(localStorage.getItem("UShop")).token } }
      );
      const data = productDetails.data;
      setProductInfo({
        ...productInfo,
        // category: data.category,
        // description: data.description,
        // images: data.images,
        ...data,
        sampleImages: data.images,
        // price: data.price,
        productName: data.product_name,
        // seen: data.seen,
        // stock: data.stock,
      });
    } catch (error) {
      console.log(error.response);
      history.push("/sell-UShop/view-product");
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
        Option={SellerProductDetailOption}
      />
    </>
  );
};

export default SellerProductDetails;
