import React, { useEffect, useState } from "react";
import { Button, ProductPageRightSection, ProductPicture } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import productService from "../appwrite/product";
import { createProduct, removeProduct } from "../store/productSlice";

function ProductViewPage() {
  const adminOrNot = useSelector((state) => state.auth.admin);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { ProductId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (ProductId) {
      productService.getProduct({ productId: ProductId }).then((status) => {
        if (status) setProduct(status);
        else navigate("/");
      });
      setLoading(false);
    } else navigate("/");
  }, [ProductId, navigate]);

  const deletePro = async () => {
    await productService
      .deleteProduct({ productId: ProductId })
      .then((status) => {
        if (status) productService.deleteFile(product.Additionalinfo);
      });
    await productService.getProducts().then((data) => {
      if (data) {
        const productData = data.documents;
        dispatch(createProduct({ productData }));
      } else dispatch(removeProduct());
    });
    navigate("/");
  };

  return loading ? (
    <h1>Loading..</h1>
  ) : product ? (
    <>
      <div className="grid grid-cols-2 gap-20 my-8">
        <ProductPicture
          image={productService.getFilePreview(product.Additionalinfo)}
        />
        <ProductPageRightSection
          id={product.$id}
          ProductName={product.Name}
          amount={product.Price}
          Desc={product.Desc}
          category={product.Category}
          Stock={product.Stock}
        />
      </div>
      {adminOrNot ? (
        <div className="grid grid-cols-2 gap-5 my-8">
          {/* TODO: for edit need to work more. */}
          <Link to={`/edit-product/${ProductId}`} className="w-full">
            <Button bgColor={"bg-green-500"} className={"w-full"}>
              Edit
            </Button>
          </Link>
          <Button bgColor={"bg-red-500"} onClick={deletePro}>
            Delete
          </Button>
        </div>
      ) : null}
    </>
  ) : null;
}

export default ProductViewPage;
