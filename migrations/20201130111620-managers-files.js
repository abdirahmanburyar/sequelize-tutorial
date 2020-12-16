"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const Files = await queryInterface.createTable("managers_files", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      docs: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      managerId: {
        type: Sequelize.INTEGER,
      },
      fileName: Sequelize.STRING,
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
    Files.associate = (models) => {
      Files.belongsTo(models.managers, {
        foreignKey: "managerId",
        targetKey: "id",
      });
    };
    return Files;
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("managers_files");
  },
};
