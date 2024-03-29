import React from "react";
import LoadAllProducts from "../components/LoadAllProducts";
import { Container } from "../components";
import LoadAllCategory from "../components/LoadAllCategory";

function Home() {
  return (
    <div>
      <Container>
        <div className="grid grid-cols-3 gap-4 my-8">
          <div>
            <LoadAllCategory />
          </div>
          <div className="col-span-2">
            <LoadAllProducts />
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Home;
