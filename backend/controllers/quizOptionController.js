const QuizOption = require("../models/quiz_option");
const QuizQuestion = require("../models/quiz_question");

// Create option
exports.createOption = async (req, res) => {
  try {
    const { question_id, option_text, is_correct } = req.body;

    const question = await QuizQuestion.findByPk(question_id);
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    const option = await QuizOption.create({
      question_id,
      option_text,
      is_correct
    });

    return res.status(201).json({
      message: "Quiz option created successfully",
      option
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all options
exports.getAllOptions = async (req, res) => {
  try {
    const options = await QuizOption.findAll({
      include: {
        model: QuizQuestion,
        as: "question",
        attributes: ["question_id", "question_text"]
      }
    });

    return res.status(200).json(options);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get option by ID
exports.getOptionById = async (req, res) => {
  try {
    const { optionId } = req.params;

    const option = await QuizOption.findByPk(optionId, {
      include: {
        model: QuizQuestion,
        as: "question",
        attributes: ["question_id", "question_text"]
      }
    });

    if (!option) {
      return res.status(404).json({ message: "Option not found" });
    }

    return res.status(200).json(option);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update option
exports.updateOption = async (req, res) => {
  try {
    const { optionId } = req.params;
    const { option_text, is_correct } = req.body;

    const option = await QuizOption.findByPk(optionId);
    if (!option) {
      return res.status(404).json({ message: "Option not found" });
    }

    option.option_text = option_text ?? option.option_text;
    option.is_correct = is_correct ?? option.is_correct;

    await option.save();

    return res.status(200).json({
      message: "Option updated successfully",
      option
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete option
exports.deleteOption = async (req, res) => {
  try {
    const { optionId } = req.params;

    const option = await QuizOption.findByPk(optionId);
    if (!option) {
      return res.status(404).json({ message: "Option not found" });
    }

    await option.destroy();

    return res.status(200).json({ message: "Option deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};
