const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Course = require('./course');

const Assignment = sequelize.define('Assignment', {
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: true },
  dueDate: { type: DataTypes.DATE, allowNull: false }
});

Assignment.belongsTo(Course);

module.exports = Assignment;
