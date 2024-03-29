import React from "react";
import { CreateProduct as CreateProductComponent } from "../components/index";
// import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";

function CreateCategory() {
  //   const products = useSelector((state) => state.product.productData);
  return (
    <div className="py-8">
      <CreateProductComponent />
      <h1>Hello</h1>

      {/* <div>
        {products ? (
          products.map((product, index) => (
            <div className="card w-96 bg-base-100 shadow-xl" key={index}>
              <div className="card-body">
                <h2 className="card-title">{product.Name}</h2>
                <p>{product.Desc}</p>
                <div className="card-actions justify-end">
                  <Link className="btn btn-primary">Update</Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h1>Kasa hoga bhi ya</h1>
        )}
      </div> */}
    </div>
  );
}

export default CreateCategory;
