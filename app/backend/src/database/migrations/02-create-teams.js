module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('teams', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      teamName: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'team_name'
      },
    })
  },

  async down(queryInterface) {
    return queryInterface.dropTable('teams');
  },
};