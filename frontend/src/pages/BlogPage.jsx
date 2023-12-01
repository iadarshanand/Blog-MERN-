import React, { useEffect, useState } from "react";
import { Navbar } from "../components";
import { URL } from "../../constant";
import axios from "axios";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { TiEdit } from "react-icons/ti";
import { MdDelete } from "react-icons/md";

import { useSelector } from "react-redux";

const BlogPage = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [blog, setBlog] = useState("");
  const { id } = useParams();
  const currUserId = useSelector((state) => state.user.user?.userId);
  const navigate = useNavigate();

  const deleteHandler = async () => {
    try {
      const response = await axios.delete(URL + `/api/blog/${id}`);
      if (response.status == 200) {
        navigate("/");
      } else {
        console.log("Eror in deleted blog :", response);
      }
    } catch (error) {
      console.log("Eror in deleted blog :", error);
    }
  };
  useEffect(() => {
    try {
      const getBlogById = async () => {
        const response = await axios.get(URL + `/api/blog/${id}`);
        if (response.status == 200) {
          setBlog(response.data.blog);
        } else {
          console.log("Error in fetching blog detail by Id :", response);
        }
      };
      getBlogById();
    } catch (error) {
      console.log("Error in fetching blog detail by Id :", error);
    }
  }, []);

  return (
    <>
      <Navbar logoSection="true" accountSection="true" />
      {blog ? (
        <div>
          <div className="flex flex-col justify-center items-center px-28 mt-6">
            <div className="flex justify-between w-full ">
              <h1 className=" text-blue-500 font-extrabold mb-4">
                {blog.title}
              </h1>

              {blog.author._id === currUserId && (
                <div className="flex justify-center items-center">
                  <Link to={`${currentPath}/edit`}>
                    <TiEdit className="text-2xl mr-2  hover:text-blue-600 cursor-pointer" />
                  </Link>
                  <button type="button" onClick={deleteHandler}>
                    <MdDelete className="text-2xl mr-2  hover:text-blue-600 cursor-pointer" />
                  </button>
                </div>
              )}
            </div>

            <img
              src={blog.image}
              alt="imageUrl"
              className="h-60 w-full object-cover mr-4 rounded"
            />
            <div className="flex w-full justify-between">
              <p
                className="italic  mb-2"
                key={blog.author._id}
              >{`@${blog.author.username}`}</p>
              <p className="italic  mb-2" key={blog.createdAt}>
                {blog.createdAt}
              </p>
            </div>
            <p className="text-sm text-gray-700 ">{blog.description}</p>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default BlogPage;
