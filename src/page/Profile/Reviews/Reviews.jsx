import { useEffect, useState } from "react";
import {
  hideLoadingModal,
  showLoadingModal,
} from "../../../helper/modal.helper";
import axiosClient from "../../../helper/axiosHelper";
import SideBar from "../SideBar";

const Reviews = () => {
  const [data, setData] = useState();
  useEffect(() => {
    const fetchData = async () => {
      showLoadingModal();
      try {
        const res = await axiosClient.get(
          `http://localhost:8090/sso/getAllReview`
        );
        console.log(res);

        hideLoadingModal();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="w-full">
      <div className="w-[80%] mx-auto flex">
        <div className="basis-1/5">
          <SideBar />
        </div>
        <div className="basis-4/5">Review</div>
      </div>
    </div>
  );
};

export default Reviews;
