const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Module = require("./module");

const Assignment = sequelize.define(
  "Assignment",
  {
    assignment_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    module_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Module,
        key: "module_id",
      },
      onDelete: "CASCADE",
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    due_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    max_score: {
      type: DataTypes.INTEGER,
      defaultValue: 100,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "assignments",
    timestamps: false,
  }
);

Assignment.belongsTo(Module, { foreignKey: "module_id", as: "module" });

module.exports = Assignment;
