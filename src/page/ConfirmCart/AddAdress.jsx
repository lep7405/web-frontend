import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { addAddressAction } from "../../Redux/AddressSlice";
import { useDispatch } from "react-redux";
const AddAdress = ({ openAdd, setOpenAdd }) => {
  const dispatch = useDispatch()
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
  const [cityName, setCityName] = useState("");
  const [districtName, setDistrictName] = useState("");
  const [wardName, setWardName] = useState("");

  const [typ,setType] = useState("HOME")

  useEffect(() => {
    axios
      .get(
        "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json"
      )
      .then((response) => {
        setCities(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleCityChange = (event) => {
    const cityId = event.target.value;
    setSelectedCity(cityId);
    const selectedCity = cities.find((city) => city.Id === cityId);
    setCityName(selectedCity.Name);
    setDistricts(selectedCity.Districts);
  };

  const handleDistrictChange = (event) => {
    const districtId = event.target.value;
    setSelectedDistrict(districtId);
    const selectedDistrict = districts.find(
      (district) => district.Id === districtId
    );
    setDistrictName(selectedDistrict.Name);
    setWards(selectedDistrict.Wards);
  };

  const handleWardChange = (event) => {
    const wardId = event.target.value;
    setSelectedWard(wardId);
    const selectedWard = wards.find((ward) => ward.Id === wardId);
    setWardName(selectedWard.Name);
  };

  const handleSubmit = () => {
    console.log("Selected City:", cityName);
    console.log("Selected District:", districtName);
    console.log("Selected Ward:", wardName);
    console.log("Full Name:", fullName);
    console.log("Address:", address);
    console.log("Phone Number:", phoneNumber);
    const data = {
      fullName: fullName,
      phone: phoneNumber,
      addressType: typ,
      nameAddress: address,
      province: cityName,
      district: districtName,
      ward: wardName,
    };
    console.log(data);
    dispatch(addAddressAction(data))
    // dispatch(addAddressDetailAccountAction({
    //   fullName: fullName,
    //   phone: phoneNumber,
    //   type: 'home',
    //   addressString: address
    // }))
  };
  return (
    <div className="p-3">
      <div className="flex justify-between items-center">
        <h1>Add new shipping address</h1>
        <button
          onClick={() => setOpenAdd(!openAdd)}
          className="hover:cursor-pointer"
        >
          {" "}
          <CloseIcon />
        </button>
      </div>
      <div className=" flex  justify-center items-center">
        <div>
          <div className="flex flex-col">
            <label>Full name</label>
            <input
              placeholder="Full name"
              className="w-[300px] py-2"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label>Address</label>
            <input
              placeholder="Address"
              className="w-[300px] py-2"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label>Phone number</label>
            <input
              placeholder="Phone number"
              className="w-[300px] py-2"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
        </div>

        <div className="mt-2 flex flex-col gap-y-5">
          <select onChange={handleCityChange}>
            <option value="">Select City</option>
            {cities.map((city) => (
              <option key={city.Id} value={city.Id}>
                {city.Name}
              </option>
            ))}
          </select>

          <select onChange={handleDistrictChange}>
            <option value="">Select District</option>
            {districts.map((district) => (
              <option key={district.Id} value={district.Id}>
                {district.Name}
              </option>
            ))}
          </select>

          <select onChange={handleWardChange}>
            <option value="">Select Ward</option>
            {wards.map((ward) => (
              <option key={ward.Id} value={ward.Id}>
                {ward.Name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <h1>Select type of address</h1>
     <div className="flex gap-x-2">
       
        <button className="hover:cursor-pointer p-2 bg-red-200" onClick={()=>setType("HOME")}>Home</button>
        <button className="hover:cursor-pointer p-2 bg-red-200" onClick={()=>setType("OFFICE")}>Office</button>
     </div>
      <button onClick={handleSubmit} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Submit</button>
    </div>
  );
};

export default AddAdress;
