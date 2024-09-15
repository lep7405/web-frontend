import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAddressList, setAddressDefaultAction } from "../../Redux/AddressSlice";

const AllAdress = ({ isOpen, setIsOpen, openAdd, setOpenAdd }) => {
  // const [ids,setIds]=useState({
  //   id,
  //   checked:false
  // })

  // const [id,setId]=useState()

  const dispatch = useDispatch();
  const handleClick = () => {
    setIsOpen(!isOpen);
    setOpenAdd(!openAdd);
  };

  const addressList = useSelector(selectAddressList);
  console.log(addressList);


  const [checkedStates, setCheckedStates] = useState(
    addressList.map(address => address.isDefault)
  );

  // Hàm xử lý khi checkbox thay đổi
  const handleCheckboxChange = (index) => {
    // Tạo một mảng mới với tất cả các checkbox không được chọn
    const newCheckedStates = checkedStates.map((_, i) => i === index);
    // Cập nhật lại state
    setCheckedStates(newCheckedStates);
  };
  console.log(checkedStates)

  const handleSave=()=>{
    const index=checkedStates.findIndex(e=>e===true)
    
    const id=addressList[index].id

    
    dispatch(setAddressDefaultAction({id:id}))
    setIsOpen(!isOpen)
  }
  return (
    <div className="p-5">
      <div className="flex justify-between items-center">
        <h1>Shipping Address</h1>
        <h1
          className=" text-blue-400 rounded-xl hover:cursor-pointer"
          onClick={() => handleClick()}
        >
          Add new address
        </h1>
      </div>
      {addressList?.map((e, index) => {
        return (
          <div key={index} className="border-red-200 bg-gray-200 p-3 flex items-center mb-2">
            <input
              type="checkbox"
              className="basis-1/12"
              onChange={() => handleCheckboxChange(index)}
              checked={checkedStates[index]}
            />
            <div className="flex flex-col items-start gap-y-3 basis-11/12">
              <div className="flex justify-between items-center">
                <h1>{e.fullName}</h1>
                <h1>{e.phone}</h1>
              </div>
              <div className="flex justify-between items-center">
                <h1>{e.type}</h1>
                <h1>{e.nameAddress}</h1>
              </div>
              <div>
                <h1>PostCode:</h1>
                <span>{e.province}-</span>
                <span>{e.district}-</span> <span>{e.ward}</span>
              </div>
            </div>
          </div>
        );
      })}
      <div className="flex justify-around items-center mt-5">
        <button className="px-5 py-2 bg-orange-400 rounded-xl hover:cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
          Cancel
        </button>
        <button className="px-5 py-2 bg-orange-400 rounded-xl hover:cursor-pointer" onClick={()=>handleSave()}>
          Save{" "}
        </button>
      </div>
    </div>
  );
};

export default AllAdress;
