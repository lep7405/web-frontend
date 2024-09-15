import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectAddressList } from "../../Redux/AddressSlice";

const ShippingAdress = ({ isOpen, setIsOpen }) => {
  const addressList = useSelector(selectAddressList);
  console.log(addressList);
  const defaultAddress = addressList?.find((e) => e.isDefault);
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1>ShippingAdress</h1>
        <h1 onClick={() => setIsOpen(!isOpen)}>Edit</h1>
      </div>
      <div>
        {defaultAddress ? (
          <div className="flex flex-col items-start gap-y-3 basis-11/12">
          <div className="flex justify-between items-center">
            <h1>{defaultAddress.fullName}</h1>
            <h1>{defaultAddress.phone}</h1>
          </div>
          <div className="flex justify-between items-center">
            <h1>{defaultAddress.type}</h1>
            <h1>{defaultAddress.nameAddress}</h1>
          </div>
          <div>
            <h1>PostCode:</h1>
            <span>{defaultAddress.province}-</span>
            <span>{defaultAddress.district}-</span> <span>{defaultAddress.ward}</span>
          </div>
        </div>
        ) : (
          <div>No default address found</div>
        )}
      </div>
    </div>
  );
};

export default ShippingAdress;
