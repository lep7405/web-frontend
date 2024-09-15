import React from 'react'

const InforVoice = ({totalPrice,totalLength}) => {
  return (
    <div>InforVoice
        <h1>Price: {totalPrice}</h1> 
        <h1>Shipping fees:{totalLength*15000} VND</h1>
        <h1>Total: {totalPrice+totalLength*15000}</h1>
    </div>
  )
}

export default InforVoice