const validateUpdateCourse = (req, res, next) => {
  const { title, instructor_id } = req.body;
  const errors = [];

  // Only validate fields that are provided
  if (title !== undefined && title.trim() === '') {
    errors.push('Title cannot be empty');
  }

  if (instructor_id !== undefined) {
    if (typeof instructor_id !== 'number') {
      errors.push('Instructor ID must be a number');
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({ message: errors });
  }

  next();
};

module.exports = validateUpdateCourse;