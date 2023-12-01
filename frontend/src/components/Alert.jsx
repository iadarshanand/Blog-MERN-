import React from "react";

const Alert = () => {
  return (
    <div role="alert" className="w-2/3 mx-auto">
      <div className="  bg-red-500 text-white font-bold rounded-t px-4 py-2 mt-4">
        Danger
      </div>
      <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
        <p>Something not ideal might be happening.</p>
      </div>
    </div>
  );
};

export default Alert;
