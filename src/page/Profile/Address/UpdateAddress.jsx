import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
// import { addAddressAction } from "../../Redux/AddressSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { updateAddressAction } from "../../../Redux/AddressSlice";
const updateAddress = ({ isOpen, setIsOpen, item }) => {
  console.log(item);

  const [displayDistrict, setDisplayDistrict] = useState(item.district);
  const [displayWard, setDisplayWard] = useState(item.ward);

  const dispatch = useDispatch();
  const [cities, setCities] = useState([]);

  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  useEffect(() => {
    axios
      .get(
        "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json"
      )
      .then((response) => {
        console.log(response.data);
        setCities(response.data);
        const selectedCityy = response.data.find(
          (city) => city.Name === item.province
        );
        console.log(selectedCityy);
        setDistricts(selectedCityy.Districts);

        const selectedDistrictt = selectedCityy.Districts.find(
          (district) => district.Name === item.district
        );
        console.log(selectedDistrictt);
        setWards(selectedDistrictt.Wards);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const [fullName, setFullName] = useState(item.fullName);
  const [address, setAddress] = useState(item.nameAddress);
  const [phoneNumber, setPhoneNumber] = useState(item.phone);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
  const [cityName, setCityName] = useState();
  const [districtName, setDistrictName] = useState();
  const [wardName, setWardName] = useState();

  const [typ, setType] = useState(item.addressType);
  const [aa, setAa] = useState(false);

  const handleCityChange = (event) => {
    const cityId = event.target.value;
    console.log(cityId);
    setSelectedCity(cityId);
    const selectedCity = cities.find((city) => city.Id === cityId);
    setCityName(selectedCity.Name);
    setDistricts(selectedCity.Districts);
    setDisplayDistrict("");
    setDisplayWard("");
    setWards([]);
  };

  const handleDistrictChange = (event) => {
    const districtId = event.target.value;
    console.log(districtId);
    if (districtId) {
      setSelectedDistrict(districtId);
      const selectedDistrict = districts.find(
        (district) => district.Id === districtId
      );
      setDistrictName(selectedDistrict.Name);
      setWards(selectedDistrict.Wards);
    }
  };

  const handleWardChange = (event) => {
    const wardId = event.target.value;
    if (wardId) {
      setSelectedWard(wardId);
      const selectedWard = wards.find((ward) => ward.Id === wardId);
      setWardName(selectedWard.Name);
    }
  };

  const handleSubmit = () => {
    console.log("Selected City:", cityName);
    console.log("Selected District:", districtName);
    console.log("Selected Ward:", wardName);
    console.log("Full Name:", fullName);
    console.log("Address:", address);
    console.log("Phone Number:", phoneNumber);
    const data = {
      id: item.id,
      fullName: fullName,
      phone: phoneNumber,
      addressType: typ,
      nameAddress: address,
      province: cityName,
      district: districtName,
      ward: wardName,
    };
    if (!data.province || !data.district || !data.ward) {
      alert("Please select all fields");
    }
    console.log(data);
    dispatch(updateAddressAction(data));
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
          onClick={() => setIsOpen(!isOpen)}
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
            <option value="">{item.province}</option>
            {cities?.map((city) => (
              <option key={city.Id} value={city.Id}>
                {city.Name}
              </option>
            ))}
          </select>

          <select onChange={handleDistrictChange}>
            <option value="">{displayDistrict}</option>
            {districts?.map((district) => (
              <option key={district.Id} value={district.Id}>
                {district.Name}
              </option>
            ))}
          </select>

          <select onChange={handleWardChange}>
            <option value="">{displayWard}</option>
            {wards?.map((ward) => (
              <option key={ward.Id} value={ward.Id}>
                {ward.Name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <h1>Select type of address</h1>
      <div className="flex gap-x-2">
        <button
          className="hover:cursor-pointer p-2 bg-red-200"
          onClick={() => setType("HOME")}
        >
          Home
        </button>
        <button
          className="hover:cursor-pointer p-2 bg-red-200"
          onClick={() => setType("OFFICE")}
        >
          Office
        </button>
      </div>
      <button
        onClick={handleSubmit}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        Submit
      </button>
    </div>
  );
};

export default updateAddress;
