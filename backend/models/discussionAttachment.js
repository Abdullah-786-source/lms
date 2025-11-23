const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // your Sequelize instance

const DiscussionAttachment = sequelize.define('DiscussionAttachment', {
  attachment_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  discussion_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  file_path: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  uploaded_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'discussion_attachments',
  timestamps: false
});

module.exports = DiscussionAttachment;
