// middlewares/validateModule.js
const Course = require("../models/course");

// Validate module creation
const validateModule = async (req, res, next) => {
  try {
    const { course_id, title } = req.body;

    if (!course_id || !title) {
      return res.status(400).json({ message: "course_id and title are required" });
    }

    // Check if the course exists
    const course = await Course.findByPk(course_id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = validateModule;
