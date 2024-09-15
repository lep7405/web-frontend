import React,{useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {UpdateCartAction} from '../../Redux/CartSlice'
const Quantity = ({quantity,setQuantity,max1Buy,id}) => {
  console.log(max1Buy)
  const dispatch=useDispatch()
  const handleUpdateDown=()=>{
    dispatch(UpdateCartAction({id:id,quantity:quantity-1}))
    setQuantity(prev=>prev-1)
  }
  const handleUpdateUp=()=>{
    dispatch(UpdateCartAction({id:id,quantity:quantity+1}))
    setQuantity(prev=>prev+1)
  }
  return (
    <div>
        <div className="flex justify-start items-center">
            <div>Quantity:</div>
            <button className={`px-2 bg-yellow-300 hover:cursor-pointer ${quantity === 1 ? 'hover:cursor-not-allowed' : ''}`} disabled={quantity === 1} onClick={()=> handleUpdateDown()}>-</button>
            <input
              type="text"
              pattern='/d*'
              value={quantity}
              className="max-w-[50px] py-1 px-1"
              onChange={e => {
                if(e.target.value===""){
                    setQuantity(1)
                  return;
                }
                //làm quần què này hơi giống lazada
                let filteredValue = e.target.value.replace(/[^\d]/g, '')
                const maxValue =max1Buy

               if(filteredValue!==""){
                if (parseInt(filteredValue, 10) > maxValue) {
                  filteredValue = maxValue.toString()
                }
               }
               setQuantity(parseInt(filteredValue, 10))
               dispatch(UpdateCartAction({id:id,quantity:parseInt(filteredValue, 10)}))
              }}
            />
            <button className={`px-2 bg-yellow-300 hover:cursor-pointer ${quantity === max1Buy ? 'hover:cursor-not-allowed' : ''}`} disabled={quantity === max1Buy} onClick={()=>handleUpdateUp()}>+</button>
          </div>
    </div>
  )
}

export default Quantity