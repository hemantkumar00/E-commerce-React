import { useSelector } from "react-redux";
import productService from "../appwrite/product";
import { Link } from "react-router-dom";

function LoadAllProducts() {
  const products = useSelector((state) => state.product.productData);

  return (
    <>
      {" "}
      {products != null
        ? products.map((product, index) => (
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
                {/* Adjusted the Link component */}
                <Link
                  to={`/product/${product.$id}`}
                  className=" btn bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
                >
                  View Product
                </Link>
              </div>
            </div>
          ))
        : null}
    </>
  );
}

export default LoadAllProducts;
