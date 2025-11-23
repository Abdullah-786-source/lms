const Quiz = require("../models/quiz");
const Module = require("../models/module");

// Create quiz
exports.createQuiz = async (req, res) => {
  try {
    const { module_id, title, total_marks, time_limit_minutes } = req.body;

    const moduleData = await Module.findByPk(module_id);
    if (!moduleData) {
      return res.status(404).json({ message: "Module not found" });
    }

    const quiz = await Quiz.create({
      module_id,
      title,
      total_marks,
      time_limit_minutes
    });

    return res.status(201).json({
      message: "Quiz created successfully",
      quiz
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Get all quizzes
exports.getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.findAll({
      include: [
        {
          model: Module,
          as: "module",
          attributes: ["module_id", "title"]
        }
      ],
      order: [["quiz_id", "DESC"]]
    });

    return res.status(200).json(quizzes);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Get quiz by ID
exports.getQuizById = async (req, res) => {
  try {
    const quizId = req.params.quizId;

    const quiz = await Quiz.findByPk(quizId, {
      include: [
        {
          model: Module,
          as: "module",
          attributes: ["module_id", "title"]
        }
      ]
    });

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    return res.status(200).json(quiz);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Update quiz
exports.updateQuiz = async (req, res) => {
  try {
    const quizId = req.params.quizId;
    const { module_id, title, total_marks, time_limit_minutes } = req.body;

    const quiz = await Quiz.findByPk(quizId);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    await quiz.update({
      module_id,
      title,
      total_marks,
      time_limit_minutes
    });

    return res.status(200).json({
      message: "Quiz updated successfully",
      quiz
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Delete quiz
exports.deleteQuiz = async (req, res) => {
  try {
    const quizId = req.params.quizId;

    const quiz = await Quiz.findByPk(quizId);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    await quiz.destroy();

    return res.status(200).json({ message: "Quiz deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
