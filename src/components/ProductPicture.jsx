import React from "react";

function ProductPicture({ image = "" }) {
  return (
    <div className="w-full">
      <img src={image} className="max-w-full" alt="..." />
    </div>
  );
}

export default ProductPicture;
