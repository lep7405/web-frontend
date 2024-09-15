import React from 'react'

const Quantity = ({quantity,setQuantity,max1Buy}) => {
  console.log(max1Buy)
  return (
    <div>
        <div className="flex justify-start items-center">
            <div>Quantity:</div>
            <button className={`px-2 bg-yellow-300 hover:cursor-pointer ${quantity === 1 ? 'hover:cursor-not-allowed' : ''}`} disabled={quantity === 1} onClick={()=>setQuantity(prev=>prev-1)}>-</button>
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
              }}
            />
            <button className={`px-2 bg-yellow-300 hover:cursor-pointer ${quantity === max1Buy ? 'hover:cursor-not-allowed' : ''}`} disabled={quantity === max1Buy} onClick={()=>setQuantity(prev=>prev+1)}>+</button>
          </div>
    </div>
  )
}

export default Quantity