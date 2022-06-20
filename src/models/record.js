'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Record extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Record.belongsTo(models.User, {
        foreignKey: 'UserId',
        as: 'user'
      });

      Record.belongsTo(models.Document, {
        foreignKey: 'DocumentId',
        as: 'document'
      });
    }
  }
  Record.init({
    UserId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      },
    },
    DocumentId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Documents',
        key: 'id'
      },
    },
  }, {
    sequelize,
    modelName: 'Record',
  });
  return Record;
};