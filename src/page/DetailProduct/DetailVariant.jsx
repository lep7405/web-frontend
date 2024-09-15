import React, { useState } from "react";
import Quantity from "./Quantity";
import axiosClient from "../../helper/axiosHelper";
import { useParams } from "react-router-dom";
import { hideLoadingModal, showLoadingModal } from "../../helper/modal.helper";
import { Bounce, toast } from "react-toastify";
const ProductVariantsSelector = ({ product }) => {
  const {id}=useParams()
  console.log(id)
  const [quantity, setQuantity] = useState(1)
  console.log(product);
  const products = product?.proVarList;
  console.log(products);
  const arrImageValue = products?.reduce((acc, item) => {
    const colorItem = item.vars.find((varItem) => varItem.key1 === "color");

    if (
      colorItem &&
      !acc.some((accItem) => accItem.value === colorItem.value)
    ) {
      acc.push({
        image: item.image,
        value: colorItem.value,
      });
    }

    return acc;
  }, []);

  console.log(arrImageValue);

  const varsObject = products[0]?.vars.reduce((acc, { key1, value }) => {
    acc[key1] = value;
    return acc;
  }, {});

  console.log(varsObject);
  // Initialize state to keep track of selected variant values
  const [selectedVariants, setSelectedVariants] = useState(varsObject);

  // Get unique variant keys (e.g., color, size)
  const variantKeys = Array.from(
    new Set(products?.flatMap((product) => product.vars.map((v) => v.key1)))
  );
  console.log(variantKeys);
  // Filter products based on selected variant values
  const filteredProducts = products?.filter((product) =>
    variantKeys.every((key) =>
      selectedVariants[key]
        ? product.vars.some(
            (v) => v.key1 === key && v.value === selectedVariants[key]
          )
        : true
    )
  );
  console.log(filteredProducts);
  // Handle change when a user selects a variant value
  const handleVariantChange = (key, value) => {
    setSelectedVariants((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  console.log(selectedVariants);

  function getPriceByAttributes(attributes, products) {
    // Tạo một chuỗi key từ attributes để so sánh với vars
    const attributeString = Object.entries(attributes)
      .map(([key, value]) => `${key}:${value}`)
      .join(",");

    // Tìm sản phẩm có vars khớp với attributes
    const product = products?.find(
      (product) =>
        product.vars.map((v) => `${v.key1}:${v.value}`).join(",") ===
        attributeString
    );

    // Trả về giá của sản phẩm tìm được, nếu có
    return product ? product.price : null;
  }
  const handleAddToCart=async()=>{
    const getProductIdByAttributes = (attributes, products) => {
        return products.find(product => {
            // Chuyển danh sách vars thành một đối tượng để so sánh dễ hơn
            const productAttributes = product?.vars?.reduce((acc, curr) => {
                acc[curr.key1] = curr.value;
                return acc;
            }, {});
    
            // So sánh productAttributes với attributes
            return Object.keys(attributes).every(key => productAttributes[key] === attributes[key]);
        })?.id || null; // Trả về id nếu tìm thấy, nếu không trả về null
    };
    
    const productId = getProductIdByAttributes(selectedVariants, products);

    console.log(productId,quantity);
    showLoadingModal()
    // const res = await axiosClient.post("http://localhost:8090/cart/addToCart", {
    //   id: parseInt(id),
    //   provarId: productId,
    //   quantity: quantity
    // });
    // console.log(res)
    axiosClient.post("http://localhost:8090/cart/addToCart", {
      id: parseInt(id),
      provarId: productId,
      quantity: quantity
    })
    .then(response => {
      console.log(response);
      if (response.status === 200) {
        hideLoadingModal()
        toast.success( `🦄 ${response.data} `, {
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
    });
  
 

  }
  return (
    <div>
      
      {variantKeys.map((key) => (
        <div key={key}>
         
          {product?.discountList? (
          <div className="px-2">
            <p className="text-orange-400">{(getPriceByAttributes(selectedVariants, products) * product?.discountList[0].discountValue) / 100} VND</p>
            <span className="line-through">{getPriceByAttributes(selectedVariants, products)} VND</span>
            <span> -{product?.discountList[0].discountValue}%</span>
          </div>
        ) : (
          <span className="text-orange-400 text-2xl">{getPriceByAttributes(selectedVariants, products)} VND</span>
        )}
          <h1>{key.charAt(0).toUpperCase() + key.slice(1)}:</h1>
          <div className="flex justify-start items-center">
            {Array.from(
              new Set(
                products?.flatMap((product) =>
                  product.vars.filter((v) => v.key1 === key).map((v) => v.value)
                )
              )
            ).map((value, index) => {
              if (key === "color") {
                const ii = arrImageValue.find((item) => item.value === value);
                return (
                  <div key={index}>
                    <img src={ii?.image} alt={value} className="w-20 h-20" />
                    <button
                      key={value}
                      onClick={() => handleVariantChange(key, value)}
                      style={{
                        backgroundColor:
                          selectedVariants[key] === value
                            ? "lightblue"
                            : "white",
                        margin: "0 5px",
                        padding: "5px 10px",
                        border: "1px solid #ccc",
                        cursor: "pointer",
                      }}
                    >
                      {value}
                    </button>
                  </div>
                );
              }
              return (
                <button
                  key={value}
                  onClick={() => handleVariantChange(key, value)}
                  style={{
                    backgroundColor:
                      selectedVariants[key] === value ? "lightblue" : "white",
                    margin: "0 5px",
                    padding: "5px 10px",
                    border: "1px solid #ccc",
                    cursor: "pointer",
                  }}
                >
                  {value}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      <Quantity quantity={quantity} setQuantity={setQuantity} max1Buy={product?.max1Buy}/>
      <div className="flex justify-center items-center gap-x-5">
      <button onClick={()=>handleAddToCart() } className="text-green-500 p-2 rounded-xl hover:cursor-pointer px-24 border-2 border-green-200 mt-2">Buy Now</button>
      <button onClick={()=>handleAddToCart() } className="text-green-500 p-2 rounded-xl hover:cursor-pointer px-24 border-2 border-green-200 mt-2">Add to cart</button>

      </div>
    </div>
  );
};

export default ProductVariantsSelector;
