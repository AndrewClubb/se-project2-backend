const db = require("../models/course.model.js");
const Course = db.courses;
const Op = db.Sequelize.Op;
// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.body.dept) {
    res.status(400).send({
      message: "Dept can not be empty!"
    });
    return;
  } else if (!req.body.courseNumber) {
    res.status(400).send({
      message: "courseNumber can not be empty!"
    });
    return;
  } else if (!req.body.name) {
    res.status(400).send({
      message: "Name can not be empty!"
    });
    return;
  }
  // Create a Tutorial
  const course = {
    dept: req.body.dept,
    courseNumber: req.body.courseNumber,
    level: req.body.level,
    hours: req.body.hours,
    name: req.body.name,
    description: req.body.description
  };
  // Save Tutorial in the database
  Course.create(course)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Course."
      });
    });
};


// Retrieve all Courses from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  Course.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving courses."
      });
    });
};

exports.findOne = (req, res) => {

};

exports.update = (req, res) => {

};

exports.delete = (req, res) => {

};