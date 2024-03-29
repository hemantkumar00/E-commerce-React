import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import store from "./store/store.js";
import "./index.css";
import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login.jsx";
import { CreateProduct, Protected } from "./components/index.js";
import Signup from "./pages/Signup.jsx";
import CreateCategory from "./pages/CreateCategory.jsx";
import Home from "./pages/Home.jsx";
import ProductViewPage from "./pages/ProductViewPage.jsx";
import UpdateProduct from "./pages/UpdateProduct.jsx";
import CartPage from "./pages/CartPage.jsx";
import OrderPage from "./pages/OrderPage.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <Protected authentication>
            <Home />
          </Protected>
        ),
      },
      {
        path: "/cart",
        element: (
          <Protected authentication>
            <CartPage />
          </Protected>
        ),
      },
      {
        path: "/orders",
        element: (
          <Protected authentication>
            <OrderPage />
          </Protected>
        ),
      },
      {
        path: "/login",
        element: (
          <Protected authentication={false}>
            <Login />
          </Protected>
        ),
      },
      {
        path: "/signup",
        element: (
          <Protected authentication={false}>
            <Signup />
          </Protected>
        ),
      },
      {
        path: "/create-category",
        element: (
          <Protected authentication>
            <CreateCategory />
          </Protected>
        ),
      },
      {
        path: "/create-product",
        element: (
          <Protected authentication>
            <CreateProduct />
          </Protected>
        ),
      },
      {
        path: "/product/:ProductId",
        element: (
          <Protected authentication>
            <ProductViewPage />
          </Protected>
        ),
      },
      {
        path: "/edit-product/:ProductId",
        element: (
          <Protected authentication>
            <UpdateProduct />
          </Protected>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
