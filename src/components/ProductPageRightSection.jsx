import React, { useEffect, useState } from "react";
import Button from "./Button";
import { useDispatch } from "react-redux";
import { createCart } from "../store/cartSlice";

function ProductPageRightSection({
  ProductName = "",
  amount = "",
  Desc = "",
  category = "",
  Stock = "",
  id = "",
}) {
  const [cart, setCart] = new useState([]);
  const dispatch = useDispatch();

  const addToCart = (val) => {
    if (!cart.some((item) => item.id === val)) {
      const updatedCart = [{ id: val, val }, ...cart];
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      dispatch(createCart({ cartData: updatedCart }));
    } else {
      alert("Item is already in the cart");
    }
  };

  useEffect(() => {
    const products = JSON.parse(localStorage.getItem("cart"));
    if (products && products.length > 0) {
      setCart(products);
      dispatch(createCart({ cartData: products }));
    }
  }, []);

  return (
    <div>
      <h4 className="text-5xl font-medium leading-tight">{ProductName}</h4>
      <p className="text-xl mt-4">₹{amount}</p>
      <p>Description:- {Desc}</p>
      <p className="mb-4 font-light mt-8">Category:- {category}</p>
      <p className="mb-4 font-normal">Stock Remaining:- {Stock}</p>
      <div className="grid grid-cols-2 gap-5 my-8 mr-10">
        <Button
          bgColor={"bg-yellow-500"}
          onClick={() => {
            addToCart(id);
          }}
        >
          Add to Cart
        </Button>
        <Button bgColor={"bg-yellow-400"}>Buy Now</Button>
      </div>
    </div>
  );
}

export default ProductPageRightSection;
