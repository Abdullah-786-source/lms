const Course = require("../models/course");
const User = require("../models/user");

// Create a new course
exports.createCourse = async (req, res) => {
  try {
    const { title, description, instructor_id } = req.body;

    if (!title || !instructor_id) {
      return res.status(400).json({ message: "Title and instructor_id are required" });
    }

    const course = await Course.create({ title, description, instructor_id });
    res.status(201).json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all courses
exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.findAll({
      include: { model: User, as: "instructor", attributes: ["user_id", "username", "email"] },
    });
    res.status(200).json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get a single course by ID
exports.getCourseById = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findByPk(courseId, {
      include: { model: User, as: "instructor", attributes: ["user_id", "username", "email"] },
    });

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update a course
exports.updateCourse = async (req, res) => {
  try {
    const { courseId} = req.params;
    const { title, description, instructor_id } = req.body;

    const course = await Course.findByPk(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    await course.update({ title, description, instructor_id });
    res.status(200).json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a course
exports.deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.params;

    const course = await Course.findByPk(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    await course.destroy();
    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
