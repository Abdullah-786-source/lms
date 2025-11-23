const Enrollment = require("../models/enrollment");
const Course = require("../models/course");
const User = require("../models/user");

// Create a new enrollment
exports.createEnrollment = async (req, res) => {
  try {
    const { course_id, student_id } = req.body;

    const enrollment = await Enrollment.create({ course_id, student_id });

    res.status(201).json(enrollment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all enrollments
exports.getAllEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.findAll({
      include: [
        {
          model: Course,
          as: "course",
          include: [
            {
              model: User,
              as: "instructor",
              attributes: ["user_id", "username", "email", "first_name", "last_name", "role"]
            }
          ]
        },
        {
          model: User,
          as: "student"
        }
      ]
    });

    res.status(200).json(enrollments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get a single enrollment by ID
exports.getEnrollmentById = async (req, res) => {
  try {
    const { enrollmentId } = req.params;

    const enrollment = await Enrollment.findByPk(enrollmentId, {
      include: [
        {
          model: Course,
          as: "course",
          include: [
            {
              model: User,
              as: "instructor",
              attributes: ["user_id", "username", "email", "first_name", "last_name", "role"]
            }
          ]
        },
        {
          model: User,
          as: "student"
        }
      ]
    });

    if (!enrollment) {
      return res.status(404).json({ message: "Enrollment not found." });
    }

    res.status(200).json(enrollment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete an enrollment
exports.deleteEnrollment = async (req, res) => {
  try {
    const { enrollmentId } = req.params;

    const deleted = await Enrollment.destroy({
      where: { enrollment_id: enrollmentId }
    });

    if (!deleted) {
      return res.status(404).json({ message: "Enrollment not found." });
    }

    res.status(200).json({ message: "Enrollment deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
