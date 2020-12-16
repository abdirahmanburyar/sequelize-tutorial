"use strict";
module.exports = (sequelize, DataTypes) => {
  const Managers = sequelize.define("managers", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    email: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING, defaultValue: "password" },
    name: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.STRING,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  });
  Managers.associate = (models) => {
    Managers.hasMany(models.departments, {
      foreignKey: "manager_id",
      sourceKey: "id",
    });
    Managers.hasMany(models.managers_profiles, {
      foreignKey: "managerId",
      sourceKey: "id",
    });
    Managers.hasMany(models.managers_files, {
      foreignKey: "managerId",
      sourceKey: "id",
    });
    Managers.hasMany(models.contracts, {
      foreignKey: "contractor_id",
      sourceKey: "id",
    });
  };
  return Managers;
};
