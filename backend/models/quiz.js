const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Course = require('./course');

const Quiz = sequelize.define('Quiz', {
  title: { type: DataTypes.STRING, allowNull: false },
  totalMarks: { type: DataTypes.INTEGER, allowNull: false }
});

Quiz.belongsTo(Course);

module.exports = Quiz;
