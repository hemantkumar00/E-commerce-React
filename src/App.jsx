import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login as authLogin, logout } from "./store/authSlice";
import Header from "./components/header/Header";
import { Outlet } from "react-router-dom";
import { Container } from "./components";
import productService from "./appwrite/product";
import { createProduct, removeProduct } from "./store/productSlice";
import { createCart } from "./store/cartSlice";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    // setLoading(true)
    authService.getCurrentUser().then((userData) => {
      if (userData) {
        const admin = userData.labels && userData.labels.includes("admin");
        dispatch(authLogin({ userData, admin }));
      } else dispatch(logout());
    });
    // .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    productService
      .getProducts()
      .then((data) => {
        if (data) {
          const productData = data.documents;
          dispatch(createProduct({ productData }));
        } else dispatch(removeProduct());
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const products = JSON.parse(localStorage.getItem("cart"));
    if (products && products.length > 0) {
      dispatch(createCart({ cartData: products }));
    }
  }, []);

  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between">
      <div className="w-full block">
        <Header />
        <main>
          <Container>
            <Outlet />
          </Container>
        </main>
        {/* <Footer /> */}
      </div>
    </div>
  ) : null;
}

export default App;
