import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import CartItem from "./CartItem";
import axios from "axios";
import axiosClient from "../../helper/axiosHelper";
const CreatePayment = () => {
  const location = useLocation();
  const { cart,address } = location.state || {};
  const totalPrice = cart.reduce((sum, item) => {
    // Kiểm tra nếu discountValue tồn tại và hợp lệ
    const discount = item.discountValue !==0? item.price*item.quantity * item.discountValue / 100 : 0;
    
    // Tính tổng, nếu có discountValue thì áp dụng giảm giá, không thì dùng giá gốc
    return sum + (item.price*item.quantity - discount);
  }, 0);
  console.log(cart);
  let fileredItems = cart.reduce((result, item) => {
    // Tìm xem đã có mảng con cho productId này hay chưa
    const group = result.find(
      (group) => group[0].productId === item.productId
    );

    if (group) {
      // Nếu đã có mảng con cho productId này, thêm item vào mảng đó
      group.push(item);
    } else {
      // Nếu chưa có, tạo mảng mới chứa item này
      result.push([item]);
    }

    return result;
  }, []);
  const [data, setData] = useState({
    amount: parseInt(totalPrice),
    bankCode:"NCB",
    language: "vn",
    ref:""
  });
  

  console.log(data);
  const handlePayment=(ref)=>{
    console.log(data);
    const data1={
      amount:data.amount,
      bankCode:data.bankCode,
      language:data.language,
      ref:ref
    }
    console.log(data1)
    axios.get('http://localhost:8090/payment/vn-pay', {
      params: data1
    })
    .then(response => {
      if (response.data.code === 200) {
        const paymentUrl = response.data.data.paymentUrl;
        // Redirect người dùng sang payment URL
        window.location.href = paymentUrl;
      } else {
        console.error("Error:", response.data.message);
      }
    })
    .catch(error => {
      console.error("API Error:", error);
    });
  }

  const handlePayment1=()=>{
    axiosClient.post('http://localhost:8090/order/createOrder1',{
      cartItemDtoList:cart,
      address:address
    })
    .then(response => {
      console.log(response)
      handlePayment(response.data.txnRep);
    })
    .catch(error => {
      console.error("API Error:", error);
    });
    
  }
  return (
    <div className="w-full">
      <div className="w-4/5 mx-auto">
        CreatePayment
        {
          cart?.map((item, index) => {
            return (
              <div key={index}>
                <CartItem
                  item={item}
                />
              </div>
            );
          })
        }
        <div>
          <span>Số tiền {totalPrice+fileredItems.length*15000} VND</span>
        </div>
        <div className="flex">
          <h1>Ngân hàng </h1>
          <select>
            <option value="">NCB</option>
          </select>
        </div>
        <div className="flex">
          <h1>Ngôn ngữ</h1>
          <select onChange={(e) => setData({ ...data, language: e.target.value })}>
            <option value="vn">Tiếng việt</option>
            <option value="en">English</option>
          </select>
        </div>
        <button className="bg-green-500 text-white p-2" onClick={()=>handlePayment()}>Thanh toán</button>
        <button onClick={()=>handlePayment1()}>Create order1</button>
      </div>
    </div>
  );
};

export default CreatePayment;
