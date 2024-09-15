import React, { useEffect, useState } from "react";
import {
  showLoadingModal,
  hideLoadingModal,
} from "../../helper/modal.helper.js";
import axiosClient from "../../helper/axiosHelper";
import { useDispatch, useSelector } from "react-redux";
import { ClearCartAction, getCart, selectCart } from "../../Redux/CartSlice";
import CartItem from "./CartItem";
import Summary from "./Summary.jsx";
const Cart = () => {
  const dispatch = useDispatch();
  const Cart = useSelector(selectCart);
  console.log(Cart);
  const [select, setSelect] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [totalProduct, setTotalProduct] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      showLoadingModal();
      try {
        const res = await axiosClient.get(`http://localhost:8090/cart/getCart`);
        console.log(res);

        dispatch(getCart(res?.data?.cartDto?.cartItems));
        hideLoadingModal();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const handleSelectAll = () => {
    if (!selectAll) {
      let arr = [];
      for (let i = 0; i < Cart.length; i++) {
        arr.push(Cart[i].id);
      }
      setSelect(arr);
      setSelectAll(true);
    } else {
      setSelectAll(false);
      setSelect([]);
    }
  };
  return (
    <div className="w-full">
      <div className="w-[80%] mx-auto ">
        <h1 className="text-3xl font-mono">Cart</h1>
        <div className="flex justify-between items-center">
          <div className="flex justify-start items-center gap-x-3">
            <input
              type="checkbox"
              checked={selectAll}
              onClick={() => handleSelectAll()}
            />
            <h1>{totalProduct}</h1>
            <h1>items</h1>
          </div>
          <button className="text-white hover:cursor-pointer p-2 bg-red-500 rounded-xl" onClick={()=>dispatch(ClearCartAction())}>Clear</button>
        </div>
        <div className="grid grid-cols-5 gap-4">
          <div className="col-span-4">
            {
              Cart?.length === 0 && <h1 className="text-3xl font-mono">Cart is empty</h1>
            }
            {Cart?.map((item, index) => {
              return (
                <div key={index}>
                  {item && (
                    <CartItem
                      item={item}
                      setSelect={setSelect}
                      selectAll={selectAll}
                    />
                  )}
                </div>
              );
            })}
          </div>
          <div className="col-span-1">
            <Summary
              Cart={Cart}
              select={select}
              setTotalProduct={setTotalProduct}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
