const Enrollment = require("../models/enrollment");

const validateEnrollment = async (req, res, next) => {
  const { course_id, student_id } = req.body;

  if (!course_id || !student_id) {
    return res.status(400).json({ message: "Course ID and Student ID are required." });
  }

  const existing = await Enrollment.findOne({ where: { course_id, student_id } });
  if (existing) {
    return res.status(400).json({ message: "Student is already enrolled in this course." });
  }

  next(); // pass control to the controller if validation passes
};

module.exports = validateEnrollment;
