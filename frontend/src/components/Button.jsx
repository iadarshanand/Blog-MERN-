import React from "react";
import { Button } from "@material-tailwind/react";
import DropDown from "./DropDown";
const Button1 = () => {
  return (
    <div className="flex w-max gap-4 mt-5">
      <Button color="blue">color blue</Button>
      <Button color="red">color red</Button>
      <Button color="green">color green</Button>
      <Button color="amber">color amber</Button>

      <DropDown />
    </div>
  );
};

export default Button1;
