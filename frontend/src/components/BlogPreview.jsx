import React from "react";
import { Link } from "react-router-dom";

const BlogPreview = (props) => {
  const blog = props.blog;
  const { author, image, title, description, createdAt } = blog;
  return (
    <div className="w-full h-52 flex flex-row justify-start items-center my-3 py-3 px-20">
      <img
        src={image}
        alt="imageUrl"
        className="h-40 w-72 object-cover mr-4 rounded"
      />
      <div className="flex flex-col">
        <h1 className="text-xl font-semibold mb-2">{title}</h1>
        <div className="flex justify-between">
          <p className="italic  mb-2">{`@${author.username}`}</p>
          <p className="italic  mb-2">{createdAt}</p>
        </div>
        <p className="text-sm text-gray-700 overflow-hidden line-clamp-5">
          {description}
        </p>
        <Link to={`blog/${blog._id}`} className="text-blue-500 hover:underline">
          Read more
        </Link>
      </div>
    </div>
  );
};

export default BlogPreview;
