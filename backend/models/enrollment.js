const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./user");
const Course = require("./course");

const Enrollment = sequelize.define(
  "Enrollment",
  {
    enrollment_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    course_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Course,
        key: "course_id"
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE"
    },
    student_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "user_id"
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE"
    },
    enrolled_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  },
  {
    tableName: "enrollments",
    timestamps: false
  }
);

// Associations
Course.hasMany(Enrollment, {
  foreignKey: "course_id",
  as: "course_enrollments"
});

Enrollment.belongsTo(Course, {
  foreignKey: "course_id",
  as: "course"
});

User.hasMany(Enrollment, {
  foreignKey: "student_id",
  as: "user_enrollments"
});

Enrollment.belongsTo(User, {
  foreignKey: "student_id",
  as: "student"
});

module.exports = Enrollment;
