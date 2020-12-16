"use strict";
const { hash } = require("bcryptjs");
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    "users",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      fullName: {
        type: DataTypes.STRING,
        required: true,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      role: {
        type: DataTypes.ENUM,
        values: ["admin", "super-admin", "basic"],
      },
      password: {
        type: DataTypes.STRING,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      hooks: {
        afterValidate: async function (user) {
          user.password = await hash(user.password, 12);
        },
      },
    }
  );
  Users.associate = (models) => {
    Users.hasMany(models.profiles, {
      foreignKey: "user_id",
      sourceKey: "id",
    });
  };
  return Users;
};
