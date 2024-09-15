import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import "./SearchBar.css";
import { useNavigate } from "react-router-dom";

export const SearchBar = ({ setResults }) => {
  const navigate = useNavigate();
  const [input, setInput] = useState("");

  const fetchData = async (value) => {
    console.log(value);
    if (value === "") {
      return;
    }
    // Kiểm tra và khởi tạo "search" nếu chưa tồn tại

    const res = await axios.get(
      `http://localhost:8090/product/suggestion`,
      {
        params: {
          prefix: input,
        },
      }
    );
    setResults(res.data);
    console.log(res);
  };

  useEffect(() => {
    fetchData(input);
  }, [input]);
  const handleChange = (value) => {
    console.log(value);
    if (value === "") {
      setResults([]);
    }
    setInput(value);
  };
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(input);
    navigate(`/search?result=${input}`);
    // setInput("");
  }
  return (
    <div className="bg-white rounded-xl shadow">
      <form onSubmit={(e) => handleSubmit(e)} className="flex items-center pl-5">
        <input
          placeholder="Type to search..."
          value={input}
          onChange={(e) => handleChange(e.target.value)}
          onFocus={() => {
            if (input === "") {
              if (!localStorage.getItem("search")) {
                localStorage.setItem("search", JSON.stringify([]));
              }
              setResults(JSON.parse(localStorage.getItem("search")));
            }
          }}
          className="w-[600px] max-w-[600px] border border-gray-300 focus:outline-none py-5"
          onBlur={() => setResults([])}
        />
        <button className="bg-green-400 text-white rounded-xl py-5 px-5">
          <FaSearch id="search-icon" />
        </button>
      </form>
    </div>
  );
};
