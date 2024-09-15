import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Summary = ({Cart,select,setTotalProduct}) => {
  const navigate=useNavigate()
  console.log(Cart)
  console.log(select)
  let numOfProduct=Cart?.filter(item=>select.includes(item?.id)).reduce((total,item)=>total+item?.quantity,0)
  console.log(numOfProduct)
  let totalPrice = Cart?.filter(item => select.includes(item?.id))
  .reduce((total, item) => {
    // Kiểm tra nếu item có discountValue
    const discountValue = item?.discountValue/100 || 0; // Giá trị giảm giá, mặc định là 0 nếu không có
    const itemTotalPrice = item?.price * item?.quantity * (1 - discountValue);
    return total + itemTotalPrice;
  }, 0);
  setTotalProduct(numOfProduct)
  return (
    <div className="flex flex-col gap-y-5">
      <h1 className="text-3xl font-bold">Summary</h1>
      <div>Number of products : <span className="text-2xl text-orange-500">{numOfProduct}</span></div>
      <div>Total price:  <span className="text-2xl text-orange-500">{totalPrice}</span> VND</div>
      <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={()=>navigate("/confirmCart",{state:{Cart:Cart,select:select}})}>Confirm cart</button>
    </div>
  );
};

export default Summary;
