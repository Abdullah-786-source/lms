module.exports = (req, res, next) => {
  const { quiz_id, question_text, question_type, marks } = req.body;
  const errors = [];

  if (!quiz_id || isNaN(Number(quiz_id))) {
    errors.push("Quiz ID is required and must be a number.");
  }

  if (!question_text || question_text.trim() === "") {
    errors.push("Question text is required.");
  }

  if (question_type) {
    const allowed = ["multiple_choice", "true_false", "short_answer"];
    if (!allowed.includes(question_type)) {
      errors.push("Invalid question type.");
    }
  }

  if (marks !== undefined && isNaN(Number(marks))) {
    errors.push("Marks must be a number.");
  }

  if (errors.length > 0) {
    return res.status(400).json({ message: errors });
  }

  next();
};
