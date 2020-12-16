"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const Managers = await queryInterface.createTable("managers", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      email: { type: Sequelize.STRING },
      password: { type: Sequelize.STRING, defaultValue: "password" },
      name: {
        type: Sequelize.STRING,
      },
      role: {
        type: Sequelize.STRING,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
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
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("managers");
  },
};
