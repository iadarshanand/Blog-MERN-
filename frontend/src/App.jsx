import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  BlogPage,
  EditBlog,
  Home,
  Login,
  Register,
  WritePostPage,
} from "./pages";
import axios from "axios";
import Button1 from "./components/Button";

axios.defaults.withCredentials = true;

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/blog/:id" element={<BlogPage />} />
          <Route path="/write" element={<WritePostPage />} />
          <Route path="/button" element={<Button1 />} />
          <Route path="/blog/:id/edit" element={<EditBlog />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
