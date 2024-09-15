import { useState } from "react";
import RandomProduct from "./RanDomProduct";
import { SearchBar } from "../Search/SearchBar";
import { SearchResultsList } from "../Search/SearchResultsList";
import ProductSale from "./ProductSale/ProductSale";
const Home = () => {
  function getCookie(name) {
    // Tách các cookie thành mảng các cặp key=value
    var cookies = document.cookie.split(";");

    // Duyệt qua từng cookie để tìm cookie có name tương ứng
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].trim();

      // Nếu cookie bắt đầu bằng name, trả về giá trị của cookie
      if (cookie.startsWith(name + "=")) {
        return cookie.substring(name.length + 1);
      }
    }

    // Nếu không tìm thấy cookie có name tương ứng, trả về null
    return null;
  }

  // Sử dụng hàm getCookie để lấy giá trị của cookie có name là 'userDTO'
  var userDTOString = getCookie("userDTO");

  // Nếu cookie tồn tại, bạn có thể giải mã và sử dụng giá trị
  if (userDTOString) {
    // Giải mã URI component nếu cần thiết
    var decodedUserDTOString = decodeURIComponent(userDTOString);

    // Phân tích chuỗi JSON thành đối tượng JavaScript
    var userDTO = JSON.parse(atob(decodedUserDTOString));

    // Hiển thị các giá trị từ userDTO
    console.log("User DTO:", userDTO);
    localStorage.setItem("userDTO", JSON.stringify(userDTO));
  } else {
    console.log("Cookie 'userDTO' not found.");
  }

  return (
    <div className="bg-gray-200">
      <div>
        <ProductSale />
      </div>
      <div className="mt-3">
        <RandomProduct />
      </div>
    </div>
  );
};

export default Home;
