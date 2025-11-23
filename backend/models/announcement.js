const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./user");
const Course = require("./course");

const Announcement = sequelize.define("Announcement", {
  announcementId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "announcement_id"
  },
  courseId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "course_id"
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  postedBy: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "posted_by"
  },
  postedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    field: "posted_at"
  }
}, {
  tableName: "announcements",
  timestamps: false
});

// Relationships
// Map postedBy → users.user_id
Announcement.belongsTo(User, { foreignKey: "postedBy", targetKey: "user_id", as: "instructor" });
// Map courseId → courses.course_id
Announcement.belongsTo(Course, { foreignKey: "courseId", targetKey: "course_id", as: "course" });

module.exports = Announcement;
