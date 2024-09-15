import React from "react";

const ProductCart = ({ item }) => {
  console.log(item);
  return (
    <div className="h-1/3 p-2">
      <div className="bg-gray-400 border-2 border-orange-300 hover:cursor-pointer hover:scale-110 hover:shadow-2xl transition-transform transition-shadow duration-300 ease-in-out rounded-lg overflow-hidden">
        <img 
          src={item.image} 
          alt={item.productName} 
          className="w-full h-48 object-cover"
        />
        <h1 className="px-2 font-mono">{item.productName}</h1>
        {item && item?.discount?.discountValue ? (
          <div className="px-2">
            <p className="text-orange-400">{(item.price * item?.discount?.discountValue) / 100} VND</p>
            <span className="line-through">{item.price} VND</span>
            <span> -{item?.discount?.discountValue}%</span>
          </div>
        ) : (
          <span>{item.price} VND</span>
        )}
      </div>
    </div>
  );
};

export default ProductCart;

