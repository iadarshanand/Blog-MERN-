const express = require("express");
const Blog = require("../models/blog");
const { verifyJWT } = require("../middleware");
const router = express.Router();

router.post("/", verifyJWT, async (req, res) => {
  try {
    const { title, author, image, description, categories } = req.body;
    console.log(title, image, description, categories);
    const blog = new Blog({
      title,
      author: req.user.userId,
      image,
      description,
      categories,
    });
    await blog.save();
    return res.status(200).json({
      message: "Saved successful",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error ",
      error,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find({}).populate("author", "username");
    return res.status(200).json({ blogs, message: "Fetched all Blogs" });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error ",
      error,
    });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id).populate("author", "username");

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    return res.status(200).json({
      blog,
      message: "Blog fetched successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error,
    });
  }
});

router.patch("/:id/edit", verifyJWT, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, image, categories, description } = req.body;
    const blog = await Blog.findById(id).populate("author", "username");

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }
    if (blog.author._id != req.user.userId) {
      return res.status(404).json({
        message: "User not authorized to update",
      });
    }
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { $set: { title, image, categories, description } },
      { new: true }
    );

    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.json({ message: "Blog updated successfully", updatedBlog });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error,
    });
  }
});

router.delete("/:id", verifyJWT, async (req, res) => {
  const blogId = req.params.id;

  try {
    const blog = await Blog.findById(blogId).populate("author", "username");
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    if (blog.author._id != req.user.userId) {
      return res.status(404).json({
        message: "User not authorized to delete",
      });
    }
    const deletedBlog = await Blog.findByIdAndDelete(blogId);

    if (!deletedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.json({ message: "Blog deleted successfully", deletedBlog });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
