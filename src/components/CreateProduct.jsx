import { useForm } from "react-hook-form";
import { Button, Input, Select } from "./index";
import productService from "../appwrite/product";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createProduct } from "../store/productSlice";
import { useEffect, useState } from "react";
import categoryService from "../appwrite/category";

export default function CreateProduct({ product }) {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      Name: product?.Name || "",
      Price: product?.Price || "",
      Desc: product?.Desc || "",
      Additionalinfo: product?.Additionalinfo || "",
      Category: product?.Category || "",
      Status: product?.Status || "",
      Stock: product?.Stock || "",
    },
  });

  const [cate, setCate] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const submit = async (data) => {
    if (product) {
      const file = data.image[0]
        ? await productService.uploadFile(data.image[0])
        : null;

      if (file) {
        productService.deleteFile(product.Additionalinfo);
      }

      const dbPost = await productService.updateProduct(product.$id, {
        ...data,
        Additionalinfo: file ? file.$id : undefined,
      });

      if (dbPost) {
        await productService
          .getProducts([])
          .then((product) => {
            if (product) {
              const productData = product.documents;
              dispatch(createProduct({ productData }));
            }
          })
          .catch((e) => console.log(e));
        navigate(`/`);
      }
    } else {
      const file = await productService.uploadFile(data.image[0]);

      if (file) {
        const fileId = file.$id;
        data.Additionalinfo = fileId;
        const dbPost = await productService.createProduct({
          ...data,
        });

        if (dbPost) {
          await productService
            .getProducts([])
            .then((posts) => {
              if (posts) {
                const productData = posts.documents;
                dispatch(createProduct({ productData }));
              }
            })
            .catch((e) => console.log(e));
          navigate(`/`);
        }
      }
    }
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
        setCate(val);
      });
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit(submit)} className="my-10 flex flex-wrap">
        <div className="w-2/3 px-2">
          <Input
            label="Name:"
            placeholder="Name"
            className="mb-4"
            {...register("Name", { required: true })}
          />
          <Input
            label="Desc :"
            placeholder="Desc"
            className="mb-4"
            {...register("Desc", { required: true })}
          />
          <Input
            label="Price :"
            placeholder="Price"
            type="Number"
            className="mb-4"
            {...register("Price", { required: true })}
          />
          <Input
            label="Stock :"
            placeholder="Stock"
            type="Number"
            className="mb-4"
            {...register("Stock", { required: true })}
          />
        </div>
        <div className="w-1/3 px-2">
          <Input
            label="Featured Image :"
            type="file"
            className="mb-4"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("image", { required: !product })}
          />
          {product && (
            <div className="w-full mb-4">
              <img
                src={productService.getFilePreview(product.Additionalinfo)}
                alt={product.title}
                className="rounded-lg"
              />
            </div>
          )}
          <Select
            options={["active", "inactive"]}
            label="Status"
            className="mb-4"
            {...register("Status", { required: true })}
          />
          <Select
            options={cate}
            label="Category"
            className="mb-4"
            {...register("Category", { required: true })}
          />
          <Button
            type="submit"
            bgColor={product ? "bg-green-500" : undefined}
            className="w-full"
          >
            {product ? "Update" : "Submit"}
          </Button>
        </div>
      </form>
    </>
  );
}
