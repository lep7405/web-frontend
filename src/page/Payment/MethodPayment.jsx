import React, { useState } from "react";

const MethodPayment = ({setMethodPay}) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("Cash on delivery");

  const handlePaymentChange = (event) => {
    setSelectedPaymentMethod(event.target.value);
    setMethodPay(event.target.value)
  };

  return (
    <div>
      Method Payment
      <div className="border-sky-200 border-2 p-2 mt-2">
        <div className="flex justify-between items-center w-full">
          <h1>Cash on delivery</h1>
          <input
            type="radio"
            name="paymentMethod"
            value="Cash on delivery"
            checked={selectedPaymentMethod === "Cash on delivery"}
            onChange={handlePaymentChange}
          />
        </div>
        <h1>Pay when receive</h1>
      </div>
      <div className="border-sky-200 border-2 p-2 mt-2">
        <div className="flex justify-between items-center w-full">
          <h1>ATM/Internet Banking</h1>
          <input
            type="radio"
            name="paymentMethod"
            value="ATM/Internet Banking"
            checked={selectedPaymentMethod === "ATM/Internet Banking"}
            onChange={handlePaymentChange}
          />
        </div>
        <h1>Pay online</h1>
      </div>
      <div className="mt-4">
        Selected Payment Method: {selectedPaymentMethod}
      </div>
    </div>
  );
};

export default MethodPayment;
