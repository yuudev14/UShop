import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import SellerManageAddForm from "../components/sellerManageAddForm";

const SellerAddProduct = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [addProductsForm, setAddProductsForm] = useState({
    productName: "",
    category: "",
    price: null,
    images: [],
    description: "",
    stock: null,
    sampleImages: [],
  });

  const history = useHistory();

  const addProduct = () => {
    setIsLoading(true);
    const preset = "kopfy1vm";
    const url = "https://api.cloudinary.com/v1_1/yutakaki/image/upload";
    try {
      let newImages = [];
      addProductsForm.images.forEach(async (img, i) => {
        const formData = new FormData();
        formData.append("file", img.image_link);
        formData.append("upload_preset", preset);
        const uploadImg = await axios.post(url, formData);
        newImages.push(uploadImg.data.secure_url);
        if (newImages.length === addProductsForm.images.length) {
          await axios.post(
            "/sell-ushop/add-product",
            { ...addProductsForm, newImages },
            {
              headers: {
                token: JSON.parse(localStorage.getItem("UShop")).token,
              },
            }
          );
          history.push("/sell-UShop");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const setAddProductsFormMethod = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    if (key === "images") {
      if (e.target.files.length !== 0) {
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
          setAddProductsForm({
            ...addProductsForm,
            [key]: [...addProductsForm[key], { image_link: reader.result }],
            sampleImages: [
              ...addProductsForm.sampleImages,
              { image_link: URL.createObjectURL(e.target.files[0]) },
            ],
          });
        };
      }
    } else {
      setAddProductsForm({
        ...addProductsForm,
        [key]: value,
      });
    }
  };

  return (
    <div className="addProducts">
      <SellerManageAddForm
        data={{
          isLoading,
          state: addProductsForm,
        }}
        methods={{
          setFormMethod: setAddProductsFormMethod,
          submit: addProduct,
        }}
      />
    </div>
  );
};

export default SellerAddProduct;
