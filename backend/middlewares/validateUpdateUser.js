const validateUpdateUser = (req, res, next) => {
  const { username, email, password, role } = req.body;
  const errors = [];

  // Only validate fields that are provided
  if (username !== undefined && username.trim() === '') {
    errors.push('Username cannot be empty');
  }

  if (email !== undefined && email.trim() === '') {
    errors.push('Email cannot be empty');
  }

  if (password !== undefined && password.trim() === '') {
    errors.push('Password cannot be empty');
  }

  if (role !== undefined && !['admin', 'instructor', 'student'].includes(role)) {
    errors.push('Role must be one of: admin, instructor, student');
  }

  if (errors.length > 0) {
    return res.status(400).json({ message: errors });
  }

  next();
};

module.exports = validateUpdateUser;
