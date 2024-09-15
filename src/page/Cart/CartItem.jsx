import React,{useState} from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Quantity from "./Quantity";
import { useDispatch } from "react-redux";
import { DeleteCartAction } from "../../Redux/CartSlice";
import { useNavigate } from "react-router-dom";
const CartItem = ({ item,setSelect,selectAll }) => {
  const navigate=useNavigate()
    const [quantity,setQuantity]=useState(item?.quantity)
    const [isChecked, setIsChecked] = useState(false);
    const dispatch=useDispatch()
   console.log(item)
   const handleSelect=(id)=>{
    if(!isChecked){
      setIsChecked(true)
      setSelect(prev=>[...prev,id])
    }
    else{
      setIsChecked(false)
      setSelect(prev=>prev.filter(item=>item!==id))
    }
   }
   const handleNavigate=()=>{
    navigate(`/product/${item?.productId}`)
   }
  return (
    <div className="flex justify-between items-center bg-gray-100 p-2">
      <div>
        <input type="checkbox" className="scale-150 hover:cursor-pointer" onClick={() => handleSelect(item?.id)} checked={selectAll?selectAll:isChecked}/>
      </div>
      <div onClick={handleNavigate}>
        <img src={item?.image} alt={item.name} className="w-28 h-28" />
      </div>
      <div className="flex flex-col " onClick={handleNavigate}>
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
          <DeleteOutlineIcon className="text-red-500 hover:cursor-pointer" onClick={() => dispatch(DeleteCartAction({id:item?.id}))}/>
        </div>
      </div>
      <Quantity quantity={quantity} setQuantity={setQuantity} max1Buy={item?.max1Buy} id={item?.id} />
    </div>
  );
};

export default CartItem;
