const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const AnnouncementRead = sequelize.define("AnnouncementRead", {
  announcement_read_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  announcement_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  read_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: "announcement_reads",
  timestamps: false,
  indexes: [
    {
      unique: true,
      fields: ["announcement_id", "user_id"] // prevent duplicates
    }
  ]
});

module.exports = AnnouncementRead;
