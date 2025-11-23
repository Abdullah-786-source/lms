const Course = require("../models/course");
const User = require("../models/user");

const validateAnnouncement = async (req, res, next) => {
  const { courseId, postedBy } = req.body;
  const method = req.method.toLowerCase();

  try {
    if (method === "post") {
      if (!courseId || !postedBy) {
        return res.status(400).json({ message: "courseId and postedBy are required." });
      }

      const course = await Course.findByPk(courseId);
      if (!course) return res.status(404).json({ message: "Course not found." });

      const user = await User.findByPk(postedBy);
      if (!user) return res.status(404).json({ message: "Instructor (postedBy) not found." });
    }

    if (method === "put" && courseId) {
      const course = await Course.findByPk(courseId);
      if (!course) return res.status(404).json({ message: "Course not found." });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = validateAnnouncement;
