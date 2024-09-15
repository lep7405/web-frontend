import React, { useState } from "react";
import { SearchBar } from "../page/Search/SearchBar";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { SearchResultsList } from "../page/Search/SearchResultsList";
import logo from "../assets/logo.jpg";
const Header2 = () => {
  const [results, setResults] = useState([]);
  const navigate = useNavigate();
  return (
    <div className="bg-violet-600 h-full">
      <div className="w-[80%] mx-auto">
        <div className="flex justify-between items-center py-2">
          <button>
            <Link to="/">
              <img
                src={logo}
                alt="image logo"
                className="w-[70px] h-[70px] border-2 border-solid border-orange-300 rounded-[50%]"
              />
            </Link>
          </button>
          <div>
            <SearchBar setResults={setResults} />
            {results && results.length > 0 && (
              <SearchResultsList results={results} setResults={setResults} />
            )}
          </div>
          <div>
            <button className=" text-5xl" type="button" onClick={() => navigate("/cart")}>
              <ShoppingCartOutlinedIcon/>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header2;
