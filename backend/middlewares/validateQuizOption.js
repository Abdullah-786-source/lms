module.exports = (req, res, next) => {
  const { question_id, option_text, is_correct } = req.body;

  if (!question_id) {
    return res.status(400).json({ message: "question_id is required" });
  }

  if (!option_text || option_text.trim() === "") {
    return res.status(400).json({ message: "option_text is required" });
  }

  if (is_correct !== undefined && typeof is_correct !== "boolean") {
    return res.status(400).json({ message: "is_correct must be boolean" });
  }

  next();
};
