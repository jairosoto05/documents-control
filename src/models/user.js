'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Record, {
        foreignKey: 'UserId',
        as: 'records'
      });
    }
  }
  User.init({
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Department: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    Password: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};