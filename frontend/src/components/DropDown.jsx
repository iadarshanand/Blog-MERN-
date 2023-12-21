import React, { useState } from "react";
import { RiAccountPinCircleFill } from "react-icons/ri";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { URL } from "../../constant";
import { useDispatch } from "react-redux";
import { fetchUserLogout } from "../features/userSlice.js";

const Dropdown = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = async () => {
    try {
      const response = await axios.get(URL + "/api/auth/logout");
      console.log(response);
      if (response.status == 200) {
        dispatch(fetchUserLogout());
        navigate("/");
      } else {
        console.log("Error in logout :", response);
      }
    } catch (error) {
      console.log("Error in logout :", error);
    }
  };

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xl px-2 py-2 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        <RiAccountPinCircleFill />
        {isDropdownOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </button>

      {/* Dropdown menu */}
      <div
        className={`${
          isDropdownOpen ? "" : "hidden"
        } z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 absolute top-12 right-0`}
      >
        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
          <li>
            <Link
              to="/profile"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Profile
            </Link>
          </li>
          <li>
            <Link
              to="/write"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Write
            </Link>
          </li>
          <li>
            <button
              type="button"
              onClick={logoutHandler}
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Sign out
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dropdown;
