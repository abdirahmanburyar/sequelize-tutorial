"use strict";

module.exports = (sequelize, DataTypes) => {
  const Profiles = sequelize.define("profiles", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    address: {
      type: DataTypes.STRING,
      required: true,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  Profiles.associate = (models) => {
    Profiles.belongsTo(models.users, {
      foreignKey: "user_id",
      targetKey: "id",
    });
  };

  return Profiles;
};
