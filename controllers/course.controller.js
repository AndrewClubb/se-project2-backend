const db = require("../models");
const { Op } = require("sequelize");
const Course = db.course;

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
  
  const course = {
    dept: req.body.dept,
    courseNumber: req.body.courseNumber,
    level: req.body.level,
    hours: req.body.hours,
    name: req.body.name,
    description: req.body.description
  };

  // Create and Save a new Course
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

// Retrieve all Courses from the database
exports.findAllCourses = (req, res) => {
  Course.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Courses."
      });
    });
};

// Retrieve a single Course with an id
exports.findCourseById = (req, res) => {
  const id = req.params.id;
  Course.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: 'Cannot find Course with id=' + id
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error retrieving Course with id=' + id
      });
    });
};

// Retrieve courses by dept
exports.findCoursesByDept = (req, res) => {
  const dept = req.params.dept;
  Course.findAll({
    where: { dept: dept }
  })
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving Courses."
    });
  });
};

// Retrieve courses by name
exports.findCoursesByName = (req, res) => {
  const name = req.params.name;
  let stringName = "%" + name + "%"
  Course.findAll({
    where: {
      name: {
        [Op.like]: stringName
      }
    }
  }) 
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Courses."
      });
    });
};

// Retrieve courses by course number
exports.findCoursesByNumber = (req, res) => {
  const num = req.params.num;
  Course.findAll({
    where: { courseNumber: num }
  })
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving Courses."
    });
  });
};

// Update a Course by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Course.update(req.body, {
    where: { id: id }
  })
  .then(num => {
    if (num == 1) {
      res.send({
        message: 'Course was updated successfully.'
      });
    } else {
      res.send({
        message: 'Cannot update Course with id=' + id + '. Maybe Course was not found or req.body is empty!'
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: 'Error updating Course with id=' + id
    });
  });
};

// Delete a Course with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Course.destroy({
    where: { id: id }
  })
  .then(num => {
    if (num == 1) {
      res.send({
        message: 'Course was deleted successfully!'
      });
    } else {
      res.send({
        message: 'Cannot delete Course with id=${id}. Maybe Course was not found or '
      })
    }
  })
};