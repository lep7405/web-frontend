import React, { useEffect, useState } from "react";
import ShippingAdress from "./ShippingAdress";
import AllAdress from "./AllAdress";
import AddAdress from "./AddAdress";
import { hideLoadingModal, showLoadingModal } from "../../helper/modal.helper";
import axiosClient from "../../helper/axiosHelper";
import { useDispatch, useSelector } from "react-redux";
import { getAddressList, selectAddressList } from "../../Redux/AddressSlice";
import { selectCart } from "../../Redux/CartSlice";
import CartItem from "./CartItem";
import { useLocation, useNavigate } from "react-router-dom";
import MethodPayment from "../Payment/MethodPayment";
import InforVoice from "./InforVoice";
import { Bounce, toast } from "react-toastify";
const ConfirmCart = () => {
  const Carts = useSelector(selectCart);

  const addressList = useSelector(selectAddressList);
  console.log(addressList);
  const defaultAddress = addressList?.find((e) => e.isDefault);


  const navigate=useNavigate()
  console.log(Carts);
  const [isOpen, setIsOpen] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [methodPay,setMethodPay]=useState("Cash on delivery")
  const dispatch = useDispatch();
  const location = useLocation();
  const { Cart, select } = location.state || {};
  console.log(Cart, select);
  const filteredItems = Cart.filter((item) => select.includes(item.id));
  console.log(filteredItems);
  const totalPrice = filteredItems.reduce((sum, item) => {
    // Kiểm tra nếu discountValue tồn tại và hợp lệ
    const discount = item.discountValue ? item.price*item.quantity * item.discountValue / 100 : 0;
    
    // Tính tổng, nếu có discountValue thì áp dụng giảm giá, không thì dùng giá gốc
    return sum + (item.price*item.quantity - discount);
  }, 0);
  
  console.log("Total Price:", totalPrice);
    const filteredItems1 = Cart.filter((item) => select.includes(item.id)) // Lọc các item dựa trên điều kiện `select.includes(item.id)`
    .reduce((result, item) => {
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
  
  console.log(totalPrice);
  const totalLength = filteredItems1.length;
  console.log(filteredItems1);

  console.log(filteredItems);
  useEffect(() => {
    const fetchData = async () => {
      showLoadingModal();
      try {
        const res = await axiosClient.get(
          `http://localhost:8090/address/getAllAddress`
        );
        console.log(res);

        dispatch(getAddressList(res?.data?.addressList));
        hideLoadingModal();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const handlePayment=()=>{
    axiosClient.post("http://localhost:8090/cart/checkQuantity")
    .then(response => {
      console.log(response);
      if (response.status === 200) {
        hideLoadingModal()
        if(methodPay==="Cash on delivery"){
          navigate("/payment/successPayment")
        }
        else{
          navigate("/payment/createPayment",{state:{cart:filteredItems,address:defaultAddress}})
        }
      } 
    })
    .catch(error => {
      console.log(error);
      hideLoadingModal()
      toast.error( `🦄 ${error.response.data} `, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      navigate("/cart")
    });

  }


  return (
    <div className="w-full">
      <div className="w-4/5 mx-auto flex ">
        <div className="basis-3/5 p-2">
          <ShippingAdress isOpen={isOpen} setIsOpen={setIsOpen} />
          {isOpen && (
            <div className=" bg-red-300 absolute right-0 top-0 w-1/3 h-full">
              <AllAdress
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                openAdd={openAdd}
                setOpenAdd={setOpenAdd}
              />
            </div>
          )}
          {openAdd && (
            <div className=" h-1/2 w-1/2 bg-red-300 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <AddAdress openAdd={openAdd} setOpenAdd={setOpenAdd} />
            </div>
          )}
          {filteredItems1?.map((item, index) => {
            return (
              <div key={index}>
                <h1>
                  Package {index + 1} / {filteredItems1?.length}
                </h1>
                {item &&
                  item?.map((item1, index1) => {
                    return (
                      <div key={index1}>
                        {item1 && (
                          <CartItem
                            item={item1}
                            setSelect={null}
                            selectAll={null}
                          />
                        )}
                      </div>
                    );
                  })}
              </div>
            );
          })}
        </div>
        <div className="basis-2/5 p-2">
          <MethodPayment setMethodPay={setMethodPay}/>
          <InforVoice totalPrice={totalPrice} totalLength={totalLength} />
          <button className="w-full bg-red-500 p-2 text-white" onClick={()=>handlePayment()}>Payment</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmCart;
