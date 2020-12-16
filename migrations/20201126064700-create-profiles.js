"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const Profiles = await queryInterface.createTable("profiles", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      address: {
        type: Sequelize.STRING,
        required: true,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
      },
      image: {
        type: Sequelize.STRING,
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
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("profiles");
  },
};
