"use strict";
module.exports = (sequelize, DataTypes) => {
  const Files = sequelize.define("managers_files", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    docs: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    managerId: {
      type: DataTypes.INTEGER,
    },
    fileName: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  });
  Files.associate = (models) => {
    Files.belongsTo(models.managers, {
      foreignKey: "managerId",
      targetKey: "id",
    });
  };
  return Files;
};
