const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

// const issueSchema = new mongoose.Schema({
//   title: {
//     type: String
//   },
//   description: {
//     type: String
//   },
//   author: {
//     type: String
//   },
//   status: {
//     type: String,
//     default: "Open"
//   }
// });

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String
    },
    owner: {
      type: String
    },
    members: [String],
    issues: {
      type: [Map],
      of: String
    }
  },
  {
    collection: "projects"
  }
);

projectSchema.plugin(uniqueValidator, {
  message: "Error, expected {PATH} to be unique."
});

module.exports = mongoose.model("project", projectSchema);
