import React from "react";
import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <div className="w-64 bg-gray-100 p-4 border-r border-gray-300">
      <div className="mb-6">
        <Link to="/profile/myProfile" className="block mb-2">
          <h1 className="text-lg font-semibold text-gray-800 hover:text-blue-500 hover:underline">
            Manage My Account
          </h1>
        </Link>
        <h2 className="text-md text-gray-600">My profile</h2>
        <Link to="/profile/addressBook" className="block mt-2">
          <h2 className="text-md text-gray-600 hover:text-blue-500 hover:underline">
            Address Book
          </h2>
        </Link>
      </div>
      <div className="mb-6">
      <Link to="/reviews" className="block">
          <h1 className="text-lg font-semibold text-gray-800 hover:text-blue-500 hover:underline hover:cursor-pointer">
            My Reviews
          </h1>
        </Link>
      </div>
      <div className="mb-6">
        <Link to="/order" className="block">
          <h1 className="text-lg font-semibold text-gray-800 hover:text-blue-500 hover:underline hover:cursor-pointer">
            My Orders
          </h1>
        </Link>
      </div>
      <div className="mb-6">
        <h1 className="text-lg font-semibold text-gray-800 hover:text-blue-500 hover:underline">My Wishlist</h1>
      </div>
      <div>
        <Link to="/logoutOther" className="text-blue-500 hover:underline">
          Log out other devices
        </Link>
      </div>
    </div>
  );
};

export default SideBar;
