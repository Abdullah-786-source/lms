module.exports = (req, res, next) => {
  const { title, description, due_date, max_score } = req.body;
  const errors = [];

  if (title && title.trim() === "") {
    errors.push("Title cannot be empty");
  }

  if (description && typeof description !== "string") {
    errors.push("Description must be a string");
  }

  if (due_date && isNaN(Date.parse(due_date))) {
    errors.push("Due date must be a valid date");
  }

  if (max_score && (typeof max_score !== "number" || max_score <= 0)) {
    errors.push("Max score must be a positive number");
  }

  if (errors.length > 0) {
    return res.status(400).json({ message: errors });
  }

  next();
};
