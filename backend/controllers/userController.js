const User = require('../models/user');
const bcrypt = require('bcrypt');

// Create a user
exports.createUser = async (req, res) => {
  const { username, email, password, role, first_name, last_name } = req.body;

  if (!username || !email || !password || !role) {
    return res.status(400).json({ message: 'username, email, password, and role are required' });
  }

  try {
    const user = await User.create({
      username,
      email,
      password_hash: await bcrypt.hash(password, 10),
      role,
      first_name,
      last_name,
    });

    // Exclude password from response
    const { password_hash, ...userData } = user.toJSON();
    res.status(201).json(userData);

  } catch (err) {
    console.error(err);
    if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ message: 'Username or email already exists' });
    }
    res.status(500).json({ message: 'Server error' });
  }
};


// Get all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll({ attributes: { exclude: ['password'] } });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get single user
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.userId, { attributes: { exclude: ['password'] } });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update user
exports.updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { username, email, password, role } = req.body;

    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (username) user.username = username;
    if (email) user.email = email;
    if (password) user.password = await bcrypt.hash(password, 10);
    if (role) user.role = role;

    await user.save();
    res.json({ message: 'User updated successfully', user });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    await user.destroy();
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
