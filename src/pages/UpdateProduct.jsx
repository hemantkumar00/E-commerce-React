import React, { useEffect, useState } from "react";
import { CreateProduct } from "../components";
import { useNavigate, useParams } from "react-router-dom";
import productService from "../appwrite/product";

function UpdateProduct() {
  const { ProductId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (ProductId) {
      productService.getProduct({ productId: ProductId }).then((data) => {
        setProduct(data);
      });
    } else {
      navigate("/");
    }
  }, [ProductId, navigate]);

  return (
    product && (
      <div>
        <CreateProduct product={product} />
      </div>
    )
  );
}

export default UpdateProduct;
