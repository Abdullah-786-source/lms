// middlewares/validateUpdateModule.js
const Course = require("../models/course");

// Validate module update
const validateUpdateModule = async (req, res, next) => {
  try {
    const { title, course_id, description, sequence } = req.body;

    if (!title && !course_id && !description && !sequence) {
      return res.status(400).json({ message: "At least one field must be provided to update" });
    }

    // If course_id is being updated, check if the new course exists
    if (course_id) {
      const course = await Course.findByPk(course_id);
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = validateUpdateModule;
