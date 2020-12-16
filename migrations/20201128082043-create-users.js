"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const Users = await queryInterface.createTable("users", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      fullName: {
        type: Sequelize.STRING,
        required: true,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      role: {
        type: Sequelize.ENUM,
        values: ["admin", "super-admin", "basic"],
      },
      password: {
        type: Sequelize.STRING,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
    Users.associate = (models) => {
      Users.hasMany(models.profiles, {
        foreignKey: "user_id",
        sourceKey: "id",
      });
    };
    return Users;
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("users");
  },
};
