"use strict";
module.exports = (sequelize, DataTypes) => {
  const ManagersProfile = sequelize.define("managers_profiles", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    address: {
      type: DataTypes.STRING,
      required: true,
    },
    phone: { type: DataTypes.STRING },
    managerId: {
      type: DataTypes.INTEGER,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  });

  ManagersProfile.associate = (models) => {
    ManagersProfile.belongsTo(models.managers, {
      foreignKey: "managerId",
      targetKey: "id",
    });
  };

  return ManagersProfile;
};
