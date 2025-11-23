const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Module = require("./module");

const Quiz = sequelize.define(
  "Quiz",
  {
    quiz_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    module_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    total_marks: {
      type: DataTypes.INTEGER,
      defaultValue: 100
    },
    time_limit_minutes: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  },
  {
    tableName: "quizzes",
    timestamps: false
  }
);

// Relations
Quiz.belongsTo(Module, { foreignKey: "module_id", as: "module" });

module.exports = Quiz;
