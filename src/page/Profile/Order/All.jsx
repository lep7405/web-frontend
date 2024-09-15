import React from "react";
import axiosClient from "../../../helper/axiosHelper";
import { useNavigate } from "react-router-dom";

const All = ({ data }) => {
  const navigate=useNavigate();
  const handleDetail = async (e, item1) => {
    navigate(`/orderDetail/${e.propertiesArray.id}/${item1.productId}`)
    // const res = await axiosClient.get(
    //   `http://localhost:8090/order/getOrderDetail/${e.propertiesArray.id}/${item1.productId}`
    // );
    // console.log(res);
  };
  return (
    <div>
      {data?.map((e, index) => {
        return (
          <div key={index} className="w-full border-2 border-orange-300 p-2 mb-2 bg-gray-200 rounded-sm ">
            <button className="py-2 px-5 rounded-xl bg-gray-400">{e.propertiesArray.status}</button>
            {e?.propertiesArray?.orderPaidItemDtos.map((item1, index) => {
              return (
                <div
                  key={index}
                  className=" mt-2 flex justify-between items-center hover:cursor-pointer"
                >
                  <div
                    className="flex items-center"
                    onClick={() => handleDetail(e, item1)}
                  >
                    <img
                      src={item1.image}
                      className="w-[100px] h-[100px]"
                      alt="image"
                    />
                    <div>
                      <h1>{item1.productName}</h1>
                      {item1?.proVarDtos?.map((item2, index) => {
                        return (
                          <h1 key={index}>
                            {item2.key1} : {item2.value}
                          </h1>
                        );
                      })}
                    </div>
                  </div>

                  <h1>Price:{item1.provarPrice}đ</h1>
                  <h1>Shipping Fee: {item1.shippingFee}đ</h1>
                  <h1>qTy: {item1.quantity}</h1>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default All;
