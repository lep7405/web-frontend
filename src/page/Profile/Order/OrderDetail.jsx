import React, { useEffect, useState } from "react";
import SideBar from "../SideBar";
import {
  hideLoadingModal,
  showLoadingModal,
} from "../../../helper/modal.helper";
import axiosClient from "../../../helper/axiosHelper";
import { useParams } from "react-router-dom";
import Review from "./Review/Review";

const OrderDetail = () => {
  const [data, setData] = useState([]);
  const { order1Id, productId } = useParams();
  const [open,setOpen] = useState(false)
  const [rating,setRating]=useState(null)
  const [comment,setComment]=useState({
    content: "",
    files:[]
  })
  useEffect(() => {
    const fetchData = async () => {
      showLoadingModal();
      try {
        const res = await axiosClient.get(
          `http://localhost:8090/order/getOrderDetail/${order1Id}/${productId}`
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
  console.log(rating)
  console.log(comment)
  const handleSubmit=async()=>{
    let form=new FormData()
    form.append("productId",productId)
    form.append("content",comment.content)
    form.append("rateNumber",rating)
    // form.append("files",comment.files)
    for(let i=0;i<comment.files.length;i++){
      form.append("files",comment.files[i])
    }
    const res=await axiosClient.post(`http://localhost:8090/product/createComment`,form)
    console.log(res)
  }
  return (
    <div className="w-full mt-2">
      <div className="w-[80%] mx-auto flex">
        <div className="basis-1/5">
          <SideBar />
        </div>
        <div className="basis-4/5 ml-5">
          Order Detail
          <div className="mt-2">
            <div className="flex justify-between items-center">
              <button className="border-2 border-solid border-orange-300">
                {data.orderStatus}
              </button>
              <button className="bg-white px-5 py-2 hover:cursor-pointer" onClick={()=>setOpen(!open)}>Write review and rate</button>
            </div>

            {data?.orderPaidItemDtos?.map((item, index) => {
              return (
                <div
                  key={index}
                  className="flex justify-between items-center gap-x-5 mt-2"
                >
                  <img
                    src={item.image}
                    alt=""
                    className="w-[100px] h-[100px]"
                  />

                  <div>
                    {" "}
                    <h1>{item.productName}</h1>
                    {item.proVarDtos.map((item1, index1) => {
                      return (
                        <div key={index1}>
                          <h1>
                            {item1.key1} : {item1.value}
                          </h1>
                        </div>
                      );
                    })}
                  </div>
                  <div>
                    <h1>Price:{item.provarPrice} Vnd</h1>
                    <span>Shipping fee:{item.shippingFee} Vnd</span>
                  </div>
                  <div>
                    <h1>qTy: {item.quantity}</h1>
                  </div>
                </div>
              );
            })}
            <h1>Total Price: {data?.totalProductPrice} Vnd</h1>
            <div>
              <h1>Delivery time : {data?.deliveryTime}</h1>
              <h1>Shipping time : {data?.shippingTime}</h1>
              <h1>Receive time : {data?.reveivedTime}</h1>
            </div>
            <div>
              <h1>
                Address: {data?.address?.province}-{data?.address?.district}-
                {data?.address?.ward}-{data?.address?.nameAddress}
              </h1>
              <h1>Full name :{data?.address?.fullName}</h1>
              <h1>Phone : {data?.address?.phone}</h1>
            </div>
          </div>
          {
            open&&(
              <div>
                <Review setRating={setRating} setComment={setComment} rating={rating} comment={comment}/>
                <button className="bg-white px-5 py-2" onClick={()=>handleSubmit()}>Submit</button>
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;

// import React, { useEffect, useState } from "react";
// import SideBar from "../SideBar";
// import { hideLoadingModal, showLoadingModal } from "../../../helper/modal.helper";
// import axiosClient from "../../../helper/axiosHelper";

// const OrderDetail = () => {
//     const [data,setData] = useState([])
//   useEffect(() => {
//     const fetchData = async () => {
//       showLoadingModal();
//       try {
//         const res = await axiosClient.get(
//           `http://localhost:8090/shipping/getAllShipping2`,
//           {
//             params: {
//               texts: texts,
//             },
//           }
//         );
//         console.log(res);
//         setData(res.data);
//         hideLoadingModal();
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, [texts]);
//   return (
//     <div className="w-full mt-2">
//       <div className="w-[80%] mx-auto flex">
//         <div className="basis-1/5">
//           <SideBar />
//         </div>
//         <div className="basis-4/5">Order Detail</div>
//       </div>
//     </div>
//   );
// };

// export default OrderDetail;
