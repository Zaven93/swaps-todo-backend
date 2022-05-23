require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();

const connectDB = require("./db/index");
const userRoutes = require("./routes/user.route");
const todoRoutes = require("./routes/todo.route");

const port = process.env.port || 9000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRoutes);
app.use("/api/todo", todoRoutes);

const boostServer = async () => {
  try {
    await connectDB();
    app.listen(port, () => console.log(`Server is running on port ${port}`));
  } catch (error) {
    console.log(error.message);
  }
};

boostServer();
