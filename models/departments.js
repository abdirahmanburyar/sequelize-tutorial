"use strict";
module.exports = (sequelize, DataTypes) => {
  const Deparatment = sequelize.define("departments", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    manager_id: {
      type: DataTypes.INTEGER,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  });
  Deparatment.associate = (models) => {
    Deparatment.belongsTo(models.managers, {
      foreignKey: "manager_id",
      targetKey: "id",
    });
  };
  return Deparatment;
};
