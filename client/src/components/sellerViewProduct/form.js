import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { filterProductsAction } from "../../reduxStore/actions/sellerAction";

const SellerViewForm = () => {
  const dispatch = useDispatch();

  const formKey = {
    productName: "",
    category: "",
    minStock: "FLOAT8 '-infinity'",
    maxStock: "FLOAT8 '+infinity'",
    minPrice: "FLOAT8 '-infinity'",
    maxPrice: "FLOAT8 '+infinity'",
  };

  const [searchForm, setSearchForm] = useState(formKey);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const category = await axios.get("/ushop/categories");
        setCategory(category.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const setSearchFormMethod = (e) => {
    let value = e.target.value;
    const name = e.target.name;
    const minKeyName = ["minStock", "minPrice"];
    const maxKeyName = ["maxStock", "maxPrice"];
    if (minKeyName.includes(name)) {
      if (value === "") {
        value = "FLOAT8 '-infinity'";
      }
    }

    if (maxKeyName.includes(name)) {
      if (value === "") {
        value = "FLOAT8 '+infinity'";
      }
    }

    setSearchForm({
      ...searchForm,
      [name]: value,
    });
  };

  const search = async (e) => {
    e.preventDefault();
    dispatch(filterProductsAction(searchForm));
  };

  const resetForm = () => {
    setSearchForm(formKey);
  };
  return (
    <form className="filter" onSubmit={search}>
      <div className="filterInputContainer">
        <div className="filterSearchProduct">
          <label htmlFor="productName">Product Name</label>
          <input
            id="productName"
            type="text"
            value={searchForm.productName}
            name="productName"
            onChange={setSearchFormMethod}
          />
        </div>
        <div className="filterProductCategory">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={searchForm.category}
            name="category"
            onChange={setSearchFormMethod}>
            <option disabled value="" selected>
              --- select categories ---
            </option>
            {category.map((cat) => (
              <option val={cat.category_name}>{cat.category_name}</option>
            ))}
          </select>
        </div>
        <div className="filterSearchStock">
          <label>Stock</label>
          <input
            type="number"
            value={searchForm.minStock}
            placeholder="min"
            name="minStock"
            onChange={setSearchFormMethod}
          />
          -
          <input
            type="number"
            value={searchForm.maxStock}
            placeholder="max"
            name="maxStock"
            onChange={setSearchFormMethod}
          />
        </div>
        <div className="filterSearchPrice">
          <label>Price</label>
          <input
            type="number"
            value={searchForm.minPrice}
            placeholder="min"
            name="minPrice"
            onChange={setSearchFormMethod}
          />
          -
          <input
            type="number"
            value={searchForm.maxPrice}
            placeholder="max"
            name="maxPrice"
            onChange={setSearchFormMethod}
          />
        </div>
      </div>
      <div className="filterButtonContainer">
        <input type="submit" />
        <button onClick={resetForm}>Reset</button>
      </div>
    </form>
  );
};

export default SellerViewForm;
