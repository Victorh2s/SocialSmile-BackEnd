'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('picture', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      UpictureId: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
      },
      filename: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      originalname: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
      },
    });
  },
  async down(queryInterface) {
    return queryInterface.dropTable('picture');
  },
};
