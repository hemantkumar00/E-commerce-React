import React, { useEffect, useState } from "react";
import { Button } from "./index";
import categoryService from "../appwrite/category";
import productService from "../appwrite/product";
import { useDispatch } from "react-redux";
import { createProduct, removeProduct } from "../store/productSlice";

function LoadAllCategory() {
  const [category, setCategory] = useState([]);
  const dispatch = useDispatch();

  const click = function (value) {
    console.log(value);
    productService.getProducts(value).then((data) => {
      if (data) {
        const productData = data.documents;
        console.log(productData);
        dispatch(createProduct({ productData }));
      } else dispatch(removeProduct());
    });
  };

  useEffect(() => {
    categoryService
      .getCategorys()
      .then((data) => data.documents)
      .then((data) => {
        let val = [];
        for (let i = 0; i < data.length; i++) {
          val.push(data[i].Name);
        }
        setCategory(val);
      });
  }, []);

  return (
    <div>
      {category?.map((cate, index) => (
        <Button
          onClick={() => click(cate)}
          key={index}
          className={"w-full mt-8"}
          children={cate}
        />
      ))}
    </div>
  );
}

export default LoadAllCategory;
