const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const sequelize = require('./config/db');

const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/test', (req, res) => {
  const { username, email, password, role } = req.body;

  if (!username || !email || !password || !role) {
    return res.status(400).json({ message: 'Required fields are missing' });
  }

  // Just simulate user creation without database
  const user = {
    id: Date.now(), // fake ID
    username,
    email,
    role
  };

  console.log('User data:', user);

  res.status(201).json({ message: 'User received', user });
});
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;

sequelize.sync({ alter: false })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('Error syncing database:', err));
