const Quiz_Attempt = require("../models/quizAttempt");
const Quiz = require("../models/quiz");
const User = require("../models/user");

// Create a new quiz attempt
exports.createAttempt = async (req, res) => {
  try {
    const { quiz_id, student_id, score } = req.body;

    if (!quiz_id || !student_id) {
      return res.status(400).json({ message: "quiz_id and student_id are required" });
    }

    const attempt = await Quiz_Attempt.create({ quiz_id, student_id, score });
    res.status(201).json(attempt);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all quiz attempts
exports.getAllAttempts = async (req, res) => {
  try {
    const attempts = await Quiz_Attempt.findAll({
      include: [
        { model: Quiz, as: "quiz" },        // must match alias in association
        { model: User, as: "student" }      // student_id -> users.user_id
      ]
    });
    res.json(attempts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single attempt by ID
exports.getAttemptById = async (req, res) => {
  try {
    const attempt = await Quiz_Attempt.findByPk(req.params.attemptId, {
      include: [
        { model: Quiz, as: "quiz" },
        { model: User, as: "student" }
      ]
    });

    if (!attempt) return res.status(404).json({ message: "Attempt not found" });

    res.json(attempt);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an attempt (e.g., update score)
exports.updateAttempt = async (req, res) => {
  try {
    const { score } = req.body;
    const attempt = await Quiz_Attempt.findByPk(req.params.attemptId);

    if (!attempt) return res.status(404).json({ message: "Attempt not found" });

    if (score !== undefined) attempt.score = score;
    await attempt.save();

    res.json(attempt);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete an attempt
exports.deleteAttempt = async (req, res) => {
  try {
    const attempt = await Quiz_Attempt.findByPk(req.params.attemptId);

    if (!attempt) return res.status(404).json({ message: "Attempt not found" });

    await attempt.destroy();
    res.json({ message: "Attempt deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
