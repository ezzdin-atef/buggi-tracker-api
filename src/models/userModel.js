const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      uniqueCaseInsensitive: true
    },
    password: {
      type: String,
      default: "passa1"
    },
    role: {
      type: String
    }
  },
  {
    collection: "users"
  }
);

userSchema.plugin(uniqueValidator, {
  message: "Error, expected {PATH} to be unique."
});

module.exports = mongoose.model("user", userSchema);
