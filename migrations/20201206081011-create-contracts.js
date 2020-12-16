"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const Contracts = await queryInterface.createTable("contracts", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      contractor_id: {
        type: Sequelize.INTEGER,
      },
      from: { type: Sequelize.DATE },
      to: { type: Sequelize.DATE },
      inDays: { type: Sequelize.INTEGER },
      salary: { type: Sequelize.INTEGER },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
    Contracts.associate = (models) => {
      Contracts.belongsTo(models.managers, {
        foreignKey: "contractor_id",
        targetKey: "id",
      });
    };
    return Contracts;
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("contracts");
  },
};
