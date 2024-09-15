import React, { useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useDispatch } from "react-redux";
import { DeleteCartAction } from "../../Redux/CartSlice";
const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  console.log(item);

  return (
    <div className="flex justify-between items-center bg-gray-100 p-2">
      <div>
        <img src={item?.image} alt={item.name} className="w-28 h-28" />
      </div>
      <div className="flex flex-col ">
        <h1>{item?.productName}</h1>
        {item?.varList?.map((item1, index) => {
          return (
            <div key={index}>
              <span>{item1?.key1} :</span>
              <span>{item1?.value}</span>
            </div>
          );
        })}
      </div>
      <div className="flex flex-col items-center">
        {item?.discountValue ? (
          <span>Đ {(item?.price * item?.discountValue) / 100}</span>
        ) : (
          <span>Đ {item?.price}</span>
        )}
        <div>
          <FavoriteBorderIcon className="text-green-500 hover:cursor-pointer" />
          <DeleteOutlineIcon
            className="text-red-500 hover:cursor-pointer"
            onClick={() => dispatch(DeleteCartAction({ id: item?.id }))}
          />
        </div>
      </div>
      <div>
        <span>Quantity:</span>
        <span>{item?.quantity}</span>
        
      </div>
    </div>
  );
};

export default CartItem;
