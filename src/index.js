const express = require("express");
const app = new express();
var cors = require("cors");
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://ezzdin_dev:180daraga@cluster0.fyzf3.mongodb.net/buggi?retryWrites=true&w=majority",
  { useUnifiedTopology: true, useNewUrlParser: true }
);

// const db = mongoose.connection();

// db.on("error", error => console.error(error));
// db.once("open", () => console.log("connected to database"));


app.use(cors());
app.use(express.json());

const userRouter = require("./routers/users");
const prjectRouter = require("./routers/projects");

app.use("/users", userRouter);
app.use("/projects", prjectRouter);
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(process.env.PORT || 3000, () => console.log("Server Started"));
