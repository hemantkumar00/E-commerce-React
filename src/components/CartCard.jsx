import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import productService from "../appwrite/product";
import Button from "./Button";
import { createCart, removeCart } from "../store/cartSlice";
import Input from "./Input";
import { useForm } from "react-hook-form";
import orderService from "../appwrite/order";
import { useNavigate } from "react-router-dom";

function CartCard() {
  const [cart, setCart] = useState([]);
  const [productId, setProductId] = useState([]);
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const [amount, setAmount] = useState(0);
  const { register, handleSubmit } = useForm();
  const userData = useSelector((state) => state.auth.userData);
  const navigate = useNavigate();

  const deleteFromCart = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    setProducts(products.filter((product) => product.id !== id));
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    dispatch(createCart({ cartData: updatedCart }));
  };

  useEffect(() => {
    const cartFromStorage = JSON.parse(localStorage.getItem("cart"));
    if (cartFromStorage && cartFromStorage.length > 0) {
      setCart(cartFromStorage);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    fetchProducts(cart);
  }, [cart]);

  const fetchProducts = async (cartItems) => {
    try {
      const prodcts = [];
      const productsData = [];
      let price = 0;
      for (const item of cartItems) {
        const productId = item.id;
        const productData = await productService.getProduct({ productId });
        price = productData.Price ? price + Number(productData.Price) : price;
        productsData.push(productData);
        prodcts.push(productData.$id);
      }
      setAmount(price);
      setProducts(productsData);
      setProductId(prodcts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const createOrder = async (data) => {
    try {
      const order = await orderService.createOrder({
        Addresss: data.address,
        ProductId: productId,
        UserId: userData.$id,
      });
      if (order) {
        setCart([]);
        dispatch(removeCart());
        localStorage.setItem("cart", JSON.stringify([]));
      }
      navigate("/");
    } catch (e) {
      throw e;
    }
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-4 my-8">
        <div>
          {products.length > 0 &&
            products.map((product, index) => (
              <div
                key={index}
                className="mx-8 mt-8 flex flex-col rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 md:max-w-xl md:flex-row"
              >
                <img
                  className="h-96 w-full rounded-t-lg object-cover md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
                  src={productService.getFilePreview(product.Additionalinfo)}
                  alt={product.Name}
                />
                <div className="justify-start p-6">
                  <h5 className="mb-2 text-xl font-medium text-neutral-800 dark:text-neutral-50">
                    {product.Name}
                  </h5>
                  <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                    {product.Desc}
                  </p>
                  <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                    ₹{product.Price}
                  </p>
                  {/* Adjusted the Button component */}
                  <Button onClick={() => deleteFromCart(product.$id)}>
                    Remove from Cart
                  </Button>
                </div>
              </div>
            ))}
        </div>
        {userData && products.length > 0 ? (
          <div className="m-8">
            <form onSubmit={handleSubmit(createOrder)} className="mt-8">
              <div>
                <h1 className="text-4xl text-center m-8">
                  Total Amount: ₹{amount}
                </h1>
                <Input
                  label="Address: "
                  palceholder="Address"
                  className={"mb-8"}
                  type="test"
                  {...register("address", {
                    required: true,
                  })}
                />
                <Button
                  type={"submit"}
                  className={"w-full bg-yellow-400"}
                  children={"Place Order"}
                />
              </div>
            </form>
          </div>
        ) : (
          <p> No products to view add to cart</p>
        )}
      </div>
    </>
  );
}

export default CartCard;
