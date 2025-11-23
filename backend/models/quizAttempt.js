const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Quiz = require("./quiz");
const User = require("./user");

const Quiz_Attempt = sequelize.define("Quiz_Attempt", {
  attempt_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  quiz_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Quiz,
      key: "quiz_id"
    }
  },
  student_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "user_id"   // <- maps to users table
    }
  },
  score: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  attempted_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: "quiz_attempts",
  timestamps: false
});

// Associations
Quiz_Attempt.belongsTo(Quiz, { foreignKey: "quiz_id", as: "quiz" });
Quiz_Attempt.belongsTo(User, { foreignKey: "student_id", as: "student" }); // student_id -> users.user_id

module.exports = Quiz_Attempt;
