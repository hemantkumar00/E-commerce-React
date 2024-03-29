import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import orderService from "../appwrite/order";
import { Query } from "appwrite";

function UserOrder() {
  const userData = useSelector((state) => state.auth.userData);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (userData) {
      const queries = [Query.equal("UserId", userData.$id)];
      orderService.getOrders(queries).then((data) => {
        setOrders(data.documents);
      });
    }
  }, [userData]); // Include userData in the dependency array

  return (
    <>
      {orders && orders.length > 0 ? (
        orders.map((order, index) => (
          <div
            key={index}
            className="mt-5 block rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700"
          >
            <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
              {order.$id}{" "}
            </h5>
            <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
              {order.Addresss}{" "}
            </p>
          </div>
        ))
      ) : (
        <h1>There are no orders made by you</h1>
      )}
    </>
  );
}

export default UserOrder;
