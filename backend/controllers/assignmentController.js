const Assignment = require("../models/assignment");
const Module = require("../models/module");

// Create new assignment
exports.createAssignment = async (req, res) => {
  try {
    const { module_id, title, description, due_date, max_score } = req.body;

    if (!module_id || !title) {
      return res.status(400).json({ message: "Module ID and title are required" });
    }

    const assignment = await Assignment.create({
      module_id,
      title,
      description,
      due_date,
      max_score,
    });

    res.status(201).json(assignment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all assignments
exports.getAllAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.findAll({
      include: [{ model: Module, as: "module" }],
      order: [["created_at", "DESC"]],
    });
    res.json(assignments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get assignment by ID
exports.getAssignmentById = async (req, res) => {
  try {
    const { assignmentId } = req.params;
    const assignment = await Assignment.findByPk(assignmentId, {
      include: [{ model: Module, as: "module" }],
    });

    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    res.json(assignment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update assignment
exports.updateAssignment = async (req, res) => {
  try {
    const { assignmentId } = req.params;
    const { title, description, due_date, max_score } = req.body;

    const assignment = await Assignment.findByPk(assignmentId);
    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    await assignment.update({ title, description, due_date, max_score });
    res.json(assignment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete assignment
exports.deleteAssignment = async (req, res) => {
  try {
    const { assignmentId } = req.params;
    const assignment = await Assignment.findByPk(assignmentId);

    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    await assignment.destroy();
    res.json({ message: "Assignment deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
