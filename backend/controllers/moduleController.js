const Module = require("../models/module");
const Course = require("../models/course");

// Create a new module
exports.createModule = async (req, res) => {
  try {
    const { course_id, title, description, sequence } = req.body;

    if (!course_id || !title) {
      return res.status(400).json({ message: "course_id and title are required" });
    }

    // Optional: check if course exists
    const course = await Course.findByPk(course_id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const module = await Module.create({ course_id, title, description, sequence });
    res.status(201).json(module);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all modules (optionally by course)
exports.getModules = async (req, res) => {
  try {
    const { course_id } = req.query;
    const filter = course_id ? { where: { course_id } } : {};
    const modules = await Module.findAll(filter);
    res.status(200).json(modules);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get a single module by ID
exports.getModuleById = async (req, res) => {
  try {
    const { moduleId } = req.params;
    const module = await Module.findByPk(moduleId);

    if (!module) {
      return res.status(404).json({ message: "Module not found" });
    }

    res.status(200).json(module);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update a module
exports.updateModule = async (req, res) => {
  try {
    const { moduleId } = req.params;
    const { title, description, sequence, course_id } = req.body;

    const module = await Module.findByPk(moduleId);
    if (!module) {
      return res.status(404).json({ message: "Module not found" });
    }

    // Optional: check if new course_id exists
    if (course_id) {
      const course = await Course.findByPk(course_id);
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }
    }

    await module.update({ title, description, sequence, course_id });
    res.status(200).json(module);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a module
exports.deleteModule = async (req, res) => {
  try {
    const { moduleId } = req.params;

    const module = await Module.findByPk(moduleId);
    if (!module) {
      return res.status(404).json({ message: "Module not found" });
    }

    await module.destroy();
    res.status(200).json({ message: "Module deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
