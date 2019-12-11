const Sequelize = require('sequelize');
const { Model } = require('sequelize');

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        gender: Sequelize.STRING,
        email: Sequelize.STRING,
        cpf: Sequelize.STRING,
        cep_residencial: Sequelize.NUMBER,
        cep_comercial: Sequelize.NUMBER,
        birth_date: Sequelize.DATE,
        phone: Sequelize.NUMBER,
        cell_phone: Sequelize.NUMBER,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

module.exports = User;
