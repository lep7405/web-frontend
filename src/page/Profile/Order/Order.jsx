import React, { useEffect, useState } from "react";
import {
  hideLoadingModal,
  showLoadingModal,
} from "../../../helper/modal.helper";
import axiosClient from "../../../helper/axiosHelper";
import SideBar from "../SideBar";
import All from "./All";
import Delivery from "./Delivery";
import Receive from "./Receive";
import Shipping from "./Shipping";
const Order = () => {
  const [data, setData] = useState([]);
  const [deliveryData,setDeliveryData] = useState([])
  const [texts,setTexts]  = useState("")
  const [open, setOpen] = useState({
    AllOpen: true,
    DeliveryOpen: false,
    ShippingOpen: false,
    ReceiveOpen: false,
  });
  useEffect(() => {
    const fetchData = async () => {
      showLoadingModal();
      try {
        const res = await axiosClient.get(
          `http://localhost:8090/order/getAllOrderPaid`
        );
        console.log(res);
        setData(res.data);
        hideLoadingModal();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const handleClick = (key) => {
    setOpen({
      AllOpen: key === "All",
      DeliveryOpen: key === "Delivery",
      ShippingOpen: key === "Shipping",
      ReceiveOpen: key === "Receive",
    });
    setTexts(key)
  };
  return (
    <div className="w-full mt-2">
      <div className="w-[80%] mx-auto flex">
        <div className="basis-1/5">
          <SideBar />
        </div>
        <div className="basis-4/5 ml-3">
          <h1 className="font-serif text-3xl">Order History</h1>
          <div className="flex justify-start items-center gap-x-5 hover:cursor-pointer">
            <h1
              className={open.AllOpen ? "text-blue-500  text-2xl" : " text-2xl"}
              onClick={() => handleClick("All")}
            >
              All
            </h1>
            <h1
              className={open.DeliveryOpen ? "text-blue-500  text-2xl" : " text-2xl"}
              onClick={() => handleClick("Delivery")}
            >
              Delivery
            </h1>
            <h1
              className={open.ShippingOpen ? "text-blue-500  text-2xl" : " text-2xl"}
              onClick={() => handleClick("Shipping")}
            >
              Shipping
            </h1>
            <h1
              className={open.ReceiveOpen ? "text-blue-500  text-2xl" : " text-2xl"}
              onClick={() => handleClick("Receive")}
            >
              Receive
            </h1>
          </div>
          {open.AllOpen && data && <All data={data} />}
          {open.DeliveryOpen && <Delivery texts={texts} />}
          {open.ShippingOpen && <Shipping texts={texts} />}
          {open.ReceiveOpen && <Receive texts={texts} />}
        </div>
      </div>
    </div>
  );
};

export default Order;
