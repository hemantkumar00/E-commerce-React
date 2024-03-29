import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import categoryService from "../appwrite/category";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Input, Button } from "./index";

export default function CreateCategory() {
  const { handleSubmit, register } = useForm({ defaultValues: { Name: "" } });
  const [error, setError] = useState("");
  const [category, setCategory] = useState([]);
  const navigate = useNavigate();
  const adminOrNot = useSelector((state) => state.auth.admin);
  const submit = async (data) => {
    setError("");
    try {
      if (adminOrNot) {
        await categoryService.createCategory(data);
        navigate("/");
      } else {
        navigate("/");
      }
    } catch (e) {
      setError(e.message);
    }
  };

  useEffect(() => {
    categoryService
      .getCategorys()
      .then((data) => data.documents)
      .then((data) => setCategory(data));
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
        <div className="w-2/3 px-2">
          {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
          <Input
            label="Name :"
            placeholder="Name"
            className="mb-4"
            {...register("Name", { required: true })}
          />
          <Button type="submit" bgColor="bg-green-500" className="w-full">
            Create Category
          </Button>
        </div>
      </form>
      <h1 className="m-5 text-3xl">Current Category:</h1>
      {category.map((cate, index) => (
        <div key={index} className="m-5 card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">{index + 1 + ".  " + cate.Name}</h2>
          </div>
        </div>
      ))}
    </>
  );
}
