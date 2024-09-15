import "./SearchResult.css";
import {useNavigate} from "react-router-dom"
export const SearchResult = ({ result,setResults }) => {
  const navigate=useNavigate()
  return (
    <div
      className="px-5 py-2"
      onClick={() => {
        console.log(result)
        if (!localStorage.getItem("search")) {
          localStorage.setItem("search", JSON.stringify([])); // Lưu một mảng rỗng dưới dạng chuỗi JSON
        }
    
        // Lấy giá trị từ localStorage và chuyển đổi thành mảng
        const arr = JSON.parse(localStorage.getItem("search"));
        if (!arr.includes(result?.productName)&&result?.productName) {
          arr.push(result?.productName); // Thêm giá trị mới vào mảng
          localStorage.setItem("search", JSON.stringify(arr)); // Cập nhật lại localStorage với mảng mới
        }
        if (arr.length > 8) {
          arr.shift();
        }     
        console.log("hello1")
        setResults([])
        navigate("/product/"+result?.id)
        // Navigate("/searchProduct")
      }}
    >
      <h1 className="hover:cursor-pointer hover:text-orange-300">{result?.productName ? result?.productName : result}</h1>
    </div>
  );
};


// import "./SearchResult.css";

// export const SearchResult = ({ result,setResults }) => {
//   return (
//     <div
//       className="search-result"
//       onClick={(e) => {
//         console.log(result)
//         if (!localStorage.getItem("search")) {
//           localStorage.setItem("search", JSON.stringify([])); // Lưu một mảng rỗng dưới dạng chuỗi JSON
//         }
    
//         // Lấy giá trị từ localStorage và chuyển đổi thành mảng
//         const arr = JSON.parse(localStorage.getItem("search"));
//         if (!arr.includes(result)) {
//           arr.push(result); // Thêm giá trị mới vào mảng
//           localStorage.setItem("search", JSON.stringify(arr)); // Cập nhật lại localStorage với mảng mới
//         }
//         if (arr.length > 8) {
//           arr.shift();
//         }     
//         console.log("hello1")
//         setResults([])
//       }}
//     >
//       {result}
//     </div>
//   );
// };
