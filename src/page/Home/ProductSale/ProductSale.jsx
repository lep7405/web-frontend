import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCart from "../ProductCart/ProductCart";
import { hideLoadingModal, showLoadingModal } from "../../../helper/modal.helper";
const ProductSale = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    showLoadingModal()
    const fetchData = async () => {
      const res = await axios.get(
        "http://localhost:8090/product/get5ProductSale"
      );
      console.log(res);
      setData(res.data.proDtos);
      hideLoadingModal()
    };
    fetchData();
    
  }, []);
  return (
    <div className="w-full">
      <div className="w-[80%] mx-auto ">
        <div className="bg-white p-2">
          <div className="flex justify-between items-center">
          <h1 className="font-mono text-2xl">Flash sale</h1>
          <button className="border-orange-300 border-2 text-orange-300 px-4 py-2">Shop all products</button>
          </div>
          <div className="flex justify-start items-center ">
            {data &&
              data.map((item, index) => {
                return (
                  <div key={index}>
                    <ProductCart item={item} />
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSale;
