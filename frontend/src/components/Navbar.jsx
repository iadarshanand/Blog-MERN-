import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { IoMdSearch } from "react-icons/io";
import Logo from "./Logo";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { fetchUserFailure, fetchUserSuccess } from "../features/UserSlice";
import { URL } from "../../constant";
import Dropdown from "./DropDown";

const Navbar = (props) => {
  const { user, status, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    const refetch = async () => {
      try {
        const response = await axios.get(URL + "/api/auth/refetch");
        if (response.status == 200) {
          dispatch(fetchUserSuccess(response.data));
        }
      } catch (error) {
        dispatch(fetchUserFailure());
      }
    };
    refetch();
  }, [dispatch]);
  return (
    <div className="w-screen sticky bg-slate-500 flex flex-row items-center justify-between px-6 py-2">
      {props.logoSection && (
        <div>
          <Logo logoTitle="Bloggyyy" />
        </div>
      )}

      {props.searchSection && (
        <div className="flex flex-row">
          <IoMdSearch className="text-3xl" />
          <input
            type="text"
            placeholder="Search your post"
            className="rounded-xl ml-1 px-2"
          />
        </div>
      )}

      {props.accountSection &&
        (status != "success" ? (
          <div className="flex flex-row justify-center items-center">
            <Link
              to="/login"
              className="text-white mr-1 px-2 hover:bg-blue-600 rounded-xl"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="text-white px-2 hover:bg-blue-600 rounded-xl"
            >
              Register
            </Link>
          </div>
        ) : (
          <div className="flex flex-row justify-center items-center">
            <Link to="/write" className="text-white mr-2 px-2 hover:underline">
              Write
            </Link>
            <Dropdown />
          </div>
        ))}
    </div>
  );
};

export default Navbar;
