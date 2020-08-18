const express = require("express");
const router = express.Router();

const Project = require("../models/projectModel");

router.get("/", async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
});

router.get("/:id", async (req, res) => {
  const project = await Project.findById(req.params.id);
  res.json(project);
});

router.post("/", async (req, res) => {
  const project = new Project({
    name: req.body.name,
    owner: req.body.owner,
    members: req.body.members
  });

  try {
    const newProject = await project.save();
    res.status(201).json(newProject);
  } catch (err) {
    res.status(400).json({ message: "error" });
  }
});

// router.post("/login", async (req, res) => {
//   // const user = await Project.find(
//   //   el => el.username === req.body.username && el.password === req.body.password
//   // );
//   //new RegExp("\b" + req.body.username + "\b", "i"),
//   Project.findOne(
//     {
//       username: new RegExp("\\b" + req.body.username + "\\b", "i"),
//       password: req.body.password
//     },
//     function(err, result) {
//       if (err) {
//         res.send(err);
//       } else {
//         res.send(result);
//       }
//     }
//   );
//   // if (user) {
//   //   res.json(user);
//   // } else {
//   //   res.json({ message: "error" });
//   // }
// });

router.put("/:id", getProject, async (req, res) => {
  res.project.name = req.body.name;
  res.project.owner = req.body.owner;
  res.project.members = req.body.members;
  // if (req.body.issues) {
  //   res.project.issues.title = req.body.issues.title;
  //   res.project.issues.description = req.body.issues.description;
  //   res.project.issues.author = req.body.issues.author;
  // }
  try {
    const update = await res.project.save();
    res.json(update);
  } catch (err) {
    res.status(400).json({ message: "error" });
  }
});

router.patch("/issue/:id", getProject, async (req, res) => {
  res.project.issues.push(req.body.issue);
  // console.log(req.body.issue);JSON.stringify
  try {
    const update = await res.project.save();
    res.json(update);
  } catch (err) {
    res.status(400).json({ message: "error" });
  }
});

router.delete("/:id", getProject, async (req, res) => {
  await res.project.remove();
  res.json({ message: "removed" });
});

async function getProject(req, res, next) {
  let project;
  try {
    project = await Project.findById(req.params.id);
    if (project == null) {
      return res.status(400).json({ message: "not found" });
    }
  } catch (err) {
    return res.status(500).json({ message: "error message" });
  }

  res.project = project;
  next();
}

module.exports = router;
