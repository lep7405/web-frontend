import React from "react";
import SideBar from "./SideBar";

const LogOutOther = () => {
  return (
    <div className="w-full mt-2">
      <div className="w-[80%] mx-auto flex">
        <div className="basis-1/5">
          <SideBar />
        </div>
        <div className="basis-4/5">
            Confirm password to log out other devices
        </div>
      </div>
    </div>
  );
};

export default LogOutOther;
