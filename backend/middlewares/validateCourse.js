const validateCourse = (req, res, next) => {
  const { title, instructor_id } = req.body;
  const errors = [];

  // Validate required fields
  if (title === undefined || title.trim() === '') {
    errors.push('Title is required');
  }

  if (instructor_id === undefined || instructor_id === null) {
    errors.push('Instructor ID is required');
  } else if (typeof instructor_id !== 'number') {
    errors.push('Instructor ID must be a number');
  }

  if (errors.length > 0) {
    return res.status(400).json({ message: errors });
  }

  next();
};

module.exports = validateCourse;
