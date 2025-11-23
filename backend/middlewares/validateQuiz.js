module.exports = (req, res, next) => {
  const { module_id, title, total_marks, time_limit_minutes } = req.body;
  const errors = [];

  if (!module_id) {
    errors.push("Module ID is required");
  } else if (isNaN(module_id)) {
    errors.push("Module ID must be a number");
  }

  if (!title || title.trim() === "") {
    errors.push("Title is required");
  }

  if (total_marks && isNaN(total_marks)) {
    errors.push("Total marks must be a number");
  }

  if (time_limit_minutes && isNaN(time_limit_minutes)) {
    errors.push("Time limit must be a number");
  }

  if (errors.length > 0) {
    return res.status(400).json({ message: errors });
  }

  next();
};
