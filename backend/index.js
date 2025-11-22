const express = require('express');
const cors = require('cors');
require('dotenv').config();
const sequelize = require('./config/db');

const userRoutes = require('./routes/userRoutes');
const courseRoutes = require('./routes/courseRoutes'); // add this line

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes); // add this line

const PORT = process.env.PORT || 5000;

sequelize.sync({ alter: false })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('Error syncing database:', err));
