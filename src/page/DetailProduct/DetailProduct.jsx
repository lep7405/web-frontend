import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Detail from "./Detail";
import Comment from "./Comment/Comment";
const DetailProduct = () => {
  const [data, setData] = useState();
  const [stringCate, setStringCate] = useState("");
  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `http://localhost:8090/product/detail/${id}`
      );
      console.log(res.data);
      setData(res.data);

      setStringCate(getCategoryChain(res.data?.categories[0]));
    };
    fetchData();
    const getCategoryChain = (category) => {
      let chain = category?.categoryName;
      let parent = category?.parentCategory;

      while (parent) {
        chain = parent.categoryName + " > " + chain;
        parent = parent.parentCategory;
      }

      return chain;
    };
  }, []);

  return (
    <div className="w-full">
      <div className="w-[80%] mx-auto">
        <div>
          <div
            style={{
              fontFamily: "Arial, sans-serif",
              color: "#333",
              backgroundColor: "#f9f9f9",
              padding: "10px",
              borderRadius: "5px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <strong>Category:</strong>
            {stringCate}
          </div>
          
          {
            data&&<Detail data={data} />
          }
        </div>
       {
        data?.comments&& <Comment comment={data.comments}/>
       }
      </div>
    </div>
  );
};

export default DetailProduct;
