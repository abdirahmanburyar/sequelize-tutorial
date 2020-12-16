"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const ManagersProfile = await queryInterface.createTable(
      "managers_profiles",
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        address: {
          type: Sequelize.STRING,
        },
        phone: { type: Sequelize.STRING },
        managerId: {
          type: Sequelize.INTEGER,
        },
        image: {
          type: Sequelize.STRING,
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
      }
    );

    ManagersProfile.associate = (models) => {
      ManagersProfile.belongsTo(models.managers, {
        foreignKey: "managerId",
        targetKey: "id",
      });
    };

    return ManagersProfile;
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("managers_profiles");
  },
};
