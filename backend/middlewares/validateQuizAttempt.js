const Quiz = require("../models/quiz");
const User = require("../models/user");

// Validation for create
const validateQuizAttempt = async (req, res, next) => {
  try {
    const { quiz_id, student_id, score } = req.body;

    // Required fields
    if (!quiz_id || !student_id) {
      return res.status(400).json({ message: "quiz_id and student_id are required" });
    }

    // Numeric checks
    if (isNaN(quiz_id) || isNaN(student_id)) {
      return res.status(400).json({ message: "quiz_id and student_id must be numeric" });
    }

    if (score !== undefined && isNaN(score)) {
      return res.status(400).json({ message: "score must be numeric" });
    }

    // Check existence in DB
    const quiz = await Quiz.findByPk(quiz_id);
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    const student = await User.findByPk(student_id);
    if (!student) return res.status(404).json({ message: "Student not found" });

    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Validation for update
const validateUpdateAttempt = (req, res, next) => {
  const { score } = req.body;

  if (score !== undefined && isNaN(score)) {
    return res.status(400).json({ message: "score must be numeric" });
  }

  next();
};

module.exports = { validateQuizAttempt, validateUpdateAttempt };
