const { DataTypes } = require("sequelize");
const sequelize = require("../config/db"); // your Sequelize config

const Video_Transcode = sequelize.define(
  "video_transcodes",
  {
    transcode_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    video_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    quality: {
      type: DataTypes.ENUM("360p", "480p", "720p", "1080p", "4k"),
      allowNull: false
    },
    file_path: {
      type: DataTypes.STRING,
      allowNull: false
    },
    file_size_mb: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  },
  {
    timestamps: false,
    tableName: "video_transcodes"
  }
);

module.exports = Video_Transcode;
