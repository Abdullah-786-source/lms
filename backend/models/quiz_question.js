const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Quiz = require("./quiz");

const QuizQuestion = sequelize.define(
  "QuizQuestion",
  {
    question_id: {
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
    question_text: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    question_type: {
      type: DataTypes.ENUM("multiple_choice", "true_false", "short_answer"),
      defaultValue: "multiple_choice"
    },
    marks: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    }
  },
  {
    tableName: "quiz_questions",
    timestamps: false
  }
);

// Associations
Quiz.hasMany(QuizQuestion, { foreignKey: "quiz_id", onDelete: "CASCADE" });
QuizQuestion.belongsTo(Quiz, { foreignKey: "quiz_id" });

module.exports = QuizQuestion;
