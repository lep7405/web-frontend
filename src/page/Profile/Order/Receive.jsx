import React, { useEffect, useState } from "react";
import {
  hideLoadingModal,
  showLoadingModal,
} from "../../../helper/modal.helper";
import axiosClient from "../../../helper/axiosHelper";

const Receive = ({ texts }) => {
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
      <h1 className="font-serif text-xl">You have received</h1>
      {data?.map((item, index) => {
        return (
          <div
            className="border-2 border-solid border-orange-300 mb-2 p-2 bg-gray-200"
            key={index}
          >
            <div className="flex justify-between items-center mb-2">
              <button className="py-2 px-5 rounded-xl bg-gray-400">{item.orderStatus}</button>
              <div>
                <button className="py-2 px-5 rounded-xl bg-gray-400">{item.status}</button>
                {
                  item.receiveTime?
                  (<button className="py-2 px-5 rounded-xl bg-gray-400">{item.receiveTime}</button>):(<div></div>)
                }
                
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

export default Receive;
