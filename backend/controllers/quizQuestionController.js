const QuizQuestion = require("../models/quiz_question");
const Quiz = require("../models/quiz");

exports.createQuestion = async (req, res) => {
  try {
    const { quiz_id, question_text, question_type, marks } = req.body;

    const quiz = await Quiz.findByPk(quiz_id);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found." });
    }

    const question = await QuizQuestion.create({
      quiz_id,
      question_text,
      question_type,
      marks
    });

    res.status(201).json({
      message: "Question created successfully.",
      question
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllQuestions = async (req, res) => {
  try {
    const questions = await QuizQuestion.findAll({
      include: {
        model: Quiz,
        attributes: ["quiz_id", "title"]
      }
    });

    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getQuestionById = async (req, res) => {
  try {
    const { questionId } = req.params;

    const question = await QuizQuestion.findByPk(questionId, {
      include: {
        model: Quiz,
        attributes: ["quiz_id", "title"]
      }
    });

    if (!question) {
      return res.status(404).json({ message: "Question not found." });
    }

    res.status(200).json(question);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateQuestion = async (req, res) => {
  try {
    const { questionId } = req.params;

    const question = await QuizQuestion.findByPk(questionId);
    if (!question) {
      return res.status(404).json({ message: "Question not found." });
    }

    await question.update(req.body);

    res.status(200).json({
      message: "Question updated successfully.",
      question
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteQuestion = async (req, res) => {
  try {
    const { questionId } = req.params;

    const question = await QuizQuestion.findByPk(questionId);
    if (!question) {
      return res.status(404).json({ message: "Question not found." });
    }

    await question.destroy();

    res.status(200).json({ message: "Question deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
