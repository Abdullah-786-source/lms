const validateUserFields = (req, res, next) => {
  const { username, email, password, role } = req.body;
  const errors = [];

  if (!username) errors.push('Username is required');
  if (!email) errors.push('Email is required');
  if (!password) errors.push('Password is required');
  if (!role) errors.push('Role is required');
  if (role && !['admin', 'instructor', 'student'].includes(role)) {
    errors.push('Role must be one of: admin, instructor, student');
  }

  if (errors.length > 0) {
    return res.status(400).json({ message: errors });
  }

  next(); // pass control to the controller if validation passes
};

module.exports = validateUserFields;
