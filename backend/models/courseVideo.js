const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Course = require("./course");
const Module = require("./module");

const CourseVideo = sequelize.define("CourseVideo", {
  video_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  course_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  module_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  description: DataTypes.TEXT,
  file_path: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  thumbnail_path: DataTypes.STRING(255),
  duration_seconds: DataTypes.INTEGER,
  is_preview: DataTypes.BOOLEAN,
  access_level: DataTypes.STRING,
  uploaded_at: DataTypes.DATE,
  updated_at: DataTypes.DATE
}, {
  tableName: "course_videos",
  timestamps: false
});

// Define associations
CourseVideo.belongsTo(Course, { foreignKey: "course_id", as: "course" });
CourseVideo.belongsTo(Module, { foreignKey: "module_id", as: "module" });

module.exports = CourseVideo;
