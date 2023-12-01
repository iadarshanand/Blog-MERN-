import React, { useState } from "react";
import { Navbar } from "../components";
import { ImCross } from "react-icons/im";
import axios from "axios";
import { URL } from "../../constant";

const WritePostPage = () => {
  const [cat, setCat] = useState([]);
  //Alert
  const [alert, setAlert] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    image: "",
    description: "",
    category: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Add your form submission logic here
      console.log("Form submitted:", formData);
      const response = await axios.post(URL + "/api/blog", {
        ...formData,
        categories: cat,
      });
      console.log(response);
      setFormData({ title: "", image: "", description: "", category: "" });
      setCat("");
      setAlert(response.data.message);
    } catch (error) {
      setAlert("Internal Server Error, See Console!!!");
      console.log("Internal Server Error ", error);
    }
  };

  const addCategHandler = () => {
    if (!formData.category) return;
    setCat([...cat, formData.category]);
    setFormData({
      ...formData,
      category: "",
    });
  };

  const removeCatHandler = (e) => {
    const categories = [...cat];
    const indexToRemove = categories.indexOf(e.target.id);

    if (indexToRemove !== -1) {
      // If the element is found in the array
      categories.splice(indexToRemove, 1);
    }
    setCat(categories);
  };
  return (
    <div>
      <Navbar logoSection="true" accountSection="true" />
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className=" text-xl font-extrabold mb-2">
          Share your thoughts or Experience!!!
        </h1>
        {alert && (
          <div
            className="mt-4 text-sm text-red-800 rounded-lg  dark:text-red-400"
            role="alert"
          >
            <span className="font-medium">{alert}</span>
          </div>
        )}
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="title"
            >
              Title
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="title"
              type="text"
              placeholder="Title"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="image"
            >
              Image Url
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="image"
              type="text"
              placeholder="image url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="category"
            >
              Categories
            </label>
            <div className="flex">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="category"
                type="text"
                placeholder="Category"
                name="category"
                value={formData.category}
                onChange={handleChange}
              />
              <button
                onClick={addCategHandler}
                type="button"
                className="px-2 mx-2 bg-sky-600 text-white rounded-md "
              >
                Add
              </button>
            </div>
            <div className="flex m-2 p-2 w-full ">
              {cat &&
                cat.map((category) => (
                  <div
                    type="button"
                    onClick={removeCatHandler}
                    key={category}
                    id={category}
                    className=" flex justify-center items-center bg-slate-400 px-2 mx-2 hover:line-through hover:cursor-pointer "
                  >
                    <span className=" mr-2 ">
                      <ImCross />
                    </span>
                    {category}
                  </div>
                ))}
            </div>
          </div>

          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="description"
              placeholder="Your description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WritePostPage;
