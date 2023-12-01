import React, { useEffect, useState } from "react";
import { Footer, Navbar } from "../components";
import BlogPreview from "../components/BlogPreview";
import axios from "axios";
import { URL } from "../../constant";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    const getAllBlogs = async () => {
      try {
        const response = await axios.get(URL + "/api/blog");
        if (response.status === 200) {
          return response.data.blogs; // Assuming the blogs are in response.data
        } else {
          console.log("Error in getting blogs:", response);
          return [];
        }
      } catch (error) {
        console.log("Error in getting blogs:", error);
        return [];
      }
    };

    const fetchData = async () => {
      try {
        const blogs = await getAllBlogs();
        setBlogs(blogs);
      } catch (error) {
        console.log("Error in fetching home page:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="">
      <Navbar logoSection="true" searchSection="true" accountSection="true" />
      {blogs.map((blog) => (
        <BlogPreview key={blog._id} blog={blog} />
      ))}
      <Footer />
    </div>
  );
};

export default Home;
