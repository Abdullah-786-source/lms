const express = require('express');
const cors = require('cors');
const path = require("path");  // ← Add this line at the to
require('dotenv').config();
const sequelize = require('./config/db');

const userRoutes = require('./routes/userRoutes');
const courseRoutes = require('./routes/courseRoutes');
const moduleRoutes = require("./routes/moduleRoutes");
const courseVideoRoutes = require("./routes/courseVideoRoutes"); 

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/content", express.static(path.join(__dirname, "../content")));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);
app.use("/api/modules", moduleRoutes);
app.use("/api/course-videos", courseVideoRoutes); 

const PORT = process.env.PORT || 5000;

sequelize.sync({ alter: false })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('Error syncing database:', err));
