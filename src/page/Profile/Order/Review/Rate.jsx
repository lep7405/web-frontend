import React, { useState } from "react";
import StarBorderIcon from "@mui/icons-material/StarBorder";// Assuming you're using Material UI icons

const Rate = ({rating,setRating}) => {
//   const [rating, setRating] = useState(null);  // Lưu trữ giá trị rating đã chọn
  const [hover, setHover] = useState(null);    // Lưu trữ giá trị hover (khi di chuột)

  return (
    <div>
      <h3>Rate</h3>
      {[...Array(5)].map((_, index) => {
        const currentRating = index + 1;
        return (
          <label key={currentRating}>
            <input
              type="radio"
              name="rating"
              value={currentRating}
              onClick={() => setRating(currentRating)}  // Khi nhấn vào sao để chọn rating
              style={{ display: 'none' }}               // Ẩn input để chỉ hiển thị icon sao
            />
            <StarBorderIcon
              size="large"
              className="star"
              style={{ cursor: 'pointer' }}
              color={currentRating <= (hover || rating) ? "warning" : "action"}  // Màu sao: vàng nếu hover hoặc rating
              onMouseEnter={() => setHover(currentRating)}  // Hiển thị hover khi di chuột vào
              onMouseLeave={() => setHover(null)}           // Bỏ hover khi rời chuột khỏi sao
            />
          </label>
        );
      })}
    </div>
  );
};

export default Rate;

