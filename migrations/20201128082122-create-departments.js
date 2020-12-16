"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const Deparatment = await queryInterface.createTable("departments", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
      },
      manager_id: {
        type: Sequelize.INTEGER,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
    Deparatment.associate = (models) => {
      Deparatment.belongsTo(models.managers, {
        foreignKey: "manager_id",
        targetKey: "id",
      });
    };
    return Deparatment;
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("departments");
  },
};
