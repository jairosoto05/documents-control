'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Document extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Document.hasMany(models.Record, {
        foreignKey: 'DocumentId',
        as: 'records'
        });
    }
  }
  Document.init({
    Number:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Name:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    Plate:{
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Document',
  });
  return Document;
};