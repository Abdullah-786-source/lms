const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Video_View = sequelize.define(
  "Video_View",
  {
    view_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    video_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    student_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    watched_seconds: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    last_watched: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  },
  {
    tableName: "video_views",
    timestamps: false
  }
);

module.exports = Video_View;
