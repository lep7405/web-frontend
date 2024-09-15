import React, { useEffect, useState } from "react";

import {
  hideLoadingModal,
  showLoadingModal,
} from "../../../helper/modal.helper";
import axiosClient from "../../../helper/axiosHelper";
import { useDispatch, useSelector } from "react-redux";
import {
  getAddressList,
  selectAddressList,
  setAddressDefaultAction,
} from "../../../Redux/AddressSlice";
import SideBar from "../SideBar";
import UpdateAddress from "./UpdateAddress";
import AddAdress from "../../ConfirmCart/AddAdress";
const AddressBook = () => {
  const addressList = useSelector(selectAddressList);
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState(null);
  const [openAdd, setOpenAdd] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      showLoadingModal();
      try {
        const res = await axiosClient.get(
          `http://localhost:8090/address/getAllAddress`
        );
        console.log(res);

        dispatch(getAddressList(res?.data?.addressList));
        hideLoadingModal();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  console.log(addressList);
  return (
    <div className="w-full">
      <div className="w-[80%] mx-auto flex">
        <div className="basis-1/5">
          <SideBar />
        </div>
        <div className="basis-4/5">
          <div className="flex justify-between items-center">
            <h1>Address Book</h1>
            <h2
              className="text-blue-500 hover:cursor-pointer"
              onClick={() => setOpenAdd(!openAdd)}
            >
              Add new address
            </h2>
          </div>
          {addressList?.map((e, index) => {
            return (
              <div
                key={index}
                className="border-red-200 bg-gray-200 p-3 flex items-center mb-2"
              >
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
                {e.isDefault && <>Default shipping address</>}
                <button
                  className="text-blue-500 border-red-200 border-2 hover:cursor-pointer px-4 py-2"
                  onClick={() => {
                    setIsOpen(!isOpen);
                    setId(e.id);
                  }}
                >
                  Edit
                </button>
                <button
                  className="text-blue-500 border-red-200 border-2 hover:cursor-pointer px-4 py-2"
                  onClick={() =>
                    dispatch(setAddressDefaultAction({ id: e.id }))
                  }
                >
                  Set address default
                </button>
                {isOpen && id === e.id && (
                  <div className=" h-1/2 w-1/2 bg-red-300 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <UpdateAddress
                      isOpen={isOpen}
                      setIsOpen={setIsOpen}
                      item={e}
                    />
                  </div>
                )}
              </div>
            );
          })}
          {openAdd && (
            <div className=" h-1/2 w-1/2 bg-red-300 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <AddAdress openAdd={openAdd} setOpenAdd={setOpenAdd} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddressBook;
