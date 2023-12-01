import React from "react";
import { Link } from "react-router-dom";
const Logo = ({ logoTitle }) => {
  return (
    <Link to="/" className="p-1 text-xl font-semibold italic">
      {logoTitle}
    </Link>
  );
};

export default Logo;
