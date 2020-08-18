const express = require("express");
const app = new express();
var cors = require("cors");
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://ezzdin_atef:atef1125@cluster0.fyzf3.mongodb.net/buggi?retryWrites=true&w=majority",
  { useUnifiedTopology: true, useNewUrlParser: true }
);

// const db = mongoose.connection();

// db.on("error", error => console.error(error));
// db.once("open", () => console.log("connected to database"));

var corsOptions = {
  origin: "https://5ovxy.csb.app",
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.use(express.json());

const userRouter = require("./routers/users");
const prjectRouter = require("./routers/projects");

app.use("/users", userRouter);
app.use("/projects", prjectRouter);

app.listen(3000, () => console.log("Server Started"));
