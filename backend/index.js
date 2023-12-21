const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
var cors = require("cors");

const mongoose = require("mongoose");
const authRoutes = require("./controller/auth");
const blogRoutes = require("./controller/blog");

//connect mongoose
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("DataBase connected successfully"))
  .catch((error) => console.log(error));

//middleware
app.use(
  cors({
    origin: ["https://blog-mern-x5as.vercel.app", "http://localhost:3000"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());

app.use("/api/auth", authRoutes);
app.use("/api/blog", blogRoutes);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/cookie", (req, res) => {
  res.cookie("moye", "moye");
  res.send("Moye Moye");
});

app.listen(8000, () => {
  console.log("Server is running at port 8000");
});
