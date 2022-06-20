'use strict';

const GoalsModel = (sequelize, DataTypes) => sequelize.define('dddd', {
  name: {
    type: DataTypes.STRING,
    required: true
  },
  describe: {
    type: DataTypes.STRING,
    required: true
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  }
});

module.exports = GoalsModel;