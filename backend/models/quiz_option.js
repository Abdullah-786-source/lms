const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const QuizQuestion = require("./quiz_question");

const QuizOption = sequelize.define(
  "QuizOption",
  {
    option_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    question_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: QuizQuestion,
        key: "question_id"
      },
      onDelete: "CASCADE"
    },
    option_text: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    is_correct: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  },
  {
    tableName: "quiz_options",
    timestamps: false
  }
);

QuizQuestion.hasMany(QuizOption, {
  foreignKey: "question_id",
  as: "options"
});

QuizOption.belongsTo(QuizQuestion, {
  foreignKey: "question_id",
  as: "question"
});

module.exports = QuizOption;
