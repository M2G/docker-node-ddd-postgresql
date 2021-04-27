/*eslint-disable*/
const table = "test_tb";
//@ts-ignore
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(table, {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false
    },
    /*
    createdAt: {
      type: DataTypes.UUID,
      allowNull: false
    },
    updatedBy: {
      type: DataTypes.UUID,
      allowNull: true
    }
    */

  }, {
    freezeTableName: true,
    timestamps: false,
    classMethods: {
      associate() {}
    }
  });
};
