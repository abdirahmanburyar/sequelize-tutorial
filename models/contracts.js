"use strict";
module.exports = (sequelize, DataTypes) => {
  const Contracts = sequelize.define("contracts", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    contractor_id: {
      type: DataTypes.INTEGER,
    },
    from: { type: DataTypes.DATE },
    to: { type: DataTypes.DATE },
    inDays: { type: DataTypes.INTEGER },
    salary: { type: DataTypes.INTEGER },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  });
  Contracts.associate = (models) => {
    Contracts.belongsTo(models.managers, {
      foreignKey: "contractor_id",
      targetKey: "id",
    });
  };
  return Contracts;
};
