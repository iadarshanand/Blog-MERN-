import React, { useState } from "react";
import { Navbar } from "../components";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { URL } from "../../constant";
import { useDispatch } from "react-redux";
import { fetchUserFailure, fetchUserSuccess } from "../features/userSlice.js";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //Alert
  const [alert, setAlert] = useState("");

  // State to manage form fields
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const SubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(URL + "/api/auth/login", formData);
      if (response.status === 200) {
        console.log(response);
        dispatch(fetchUserSuccess(response.data.info));
        navigate("/");
      } else {
        console.log("Error in logging :", response.message);
        setAlert(`X ${response.message}`);
        dispatch(fetchUserFailure(response.message));
      }
    } catch (error) {
      setAlert(`X ${error.response.data.message}`);
      dispatch(fetchUserFailure(error.response.data.message));
    }
  };

  return (
    <>
      <Navbar logoSection="true" accountSection="true" />

      <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
        <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
          <h1 className="text-3xl font-semibold text-center text-purple-700 underline">
            Sign in
          </h1>
          {alert && (
            <div
              className="mt-4 text-sm text-red-800 rounded-lg  dark:text-red-400"
              role="alert"
            >
              <span className="font-medium">{alert}</span>
            </div>
          )}
          <form onSubmit={SubmitHandler} className="mt-6">
            <div className="mb-2">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-800"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div className="mb-2">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-800"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            {/* <a href="#" className="text-xs text-purple-600 hover:underline">
              Forget Password?
            </a> */}
            <div className="mt-6">
              <button
                type="submit"
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
              >
                Login
              </button>
            </div>
          </form>

          <p className="mt-8 text-xs font-light text-center text-gray-700">
            {" "}
            Dont have an account?{" "}
            <Link
              to="/register"
              className="font-medium text-purple-600 hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
