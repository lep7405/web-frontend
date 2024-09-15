import React, { useEffect, useState } from "react";
import {
  hideLoadingModal,
  showLoadingModal,
} from "../../../helper/modal.helper";
import axiosClient from "../../../helper/axiosHelper";

const Shipping = ({ texts }) => {
  const [data, setData] = useState([]);
  console.log(texts);
  useEffect(() => {
    const fetchData = async () => {
      showLoadingModal();
      try {
        const res = await axiosClient.get(
          `http://localhost:8090/shipping/getAllShipping2`,
          {
            params: {
              texts: texts,
            },
          }
        );
        console.log(res);
        setData(res.data);
        hideLoadingModal();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [texts]);
  return (
    <div>
      <h1 className="font-serif text-xl mt-2">Shipper is shipping for you</h1>
      {
        data?.length === 0 ? <h1 className="font-serif text-xl mt-2">There is no orders</h1>:<div></div>
      }
      {data?.map((item, index) => {
        return (
          <div
            className="border-2 border-solid border-orange-300 mb-2 p-2"
            key={index}
          >
            <div className="flex justify-between items-center">
              <h1>{item.orderStatus}</h1>
              <div>
                <h1>{item.status}</h1>
                <h1>{item.shippingTime}</h1>
              </div>
            </div>
            <div>
              {item?.orderPaidItemDtos.map((item1, index1) => {
                return (
                  <div key={index1}>
                    <div className="flex justify-between items-center">
                      <img
                        src={item1.image}
                        className="w-[200px] h-[200px]"
                        alt="img"
                      />
                      <div>
                        <h1>{item1.productName}</h1>
                        {item1?.proVarDtos.map((item2, index2) => {
                          return (
                            <h1 key={index2}>
                              {item2.key1} : {item2.value}
                            </h1>
                          );
                        })}
                      </div>
                      <div>
                        <h1>Price: {item1.provarPrice} VND</h1>
                        <h1>Shipping fee :{item1.shippingFee}</h1>
                      </div>
                      <div>
                        <h1>qTy: {item1.quantity}</h1>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Shipping;
