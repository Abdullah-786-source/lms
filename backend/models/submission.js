const { DataTypes } = require("sequelize");
const sequelize = require("../config/db"); // your sequelize instance
const Assignment = require("./assignment");
const User = require("./user");

const Submission = sequelize.define("Submission", {
  submission_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  assignment_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Assignment,
      key: "assignment_id"
    }
  },
  student_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "user_id"
    }
  },
  submitted_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  file_path: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  score: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  feedback: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: "submissions",
  timestamps: false
});

Submission.belongsTo(Assignment, { foreignKey: "assignment_id" });
Submission.belongsTo(User, { foreignKey: "student_id" });

module.exports = Submission;
