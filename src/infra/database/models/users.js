/*eslint-disable*/
const { encryptPassword } = require('../../encryption');

const table = "users";

module.exports = function(/** @type {{ define: (arg0: string, arg1: { user_id: { type: any; autoIncrement: boolean; primaryKey: boolean; allowNull: boolean; }; first_name: { type: any; allowNull: boolean; }; last_name: { type: any; allowNull: boolean; }; email: { type: any; allowNull: boolean; unique: boolean; }; password: { type: any; allowNull: boolean; }; role_id: { type: any; allowNull: boolean; }; verification_code: { type: any; defaultValue: string; }; is_verified: { type: any; defaultValue: number; }; is_deleted: { type: any; defaultValue: number; }; created_by: { type: any; allowNull: boolean; }; updated_by: { type: any; allowNull: boolean; }; }, arg2: { hooks: { beforeCreate: (user: { password: string; }) => void; }; freezeTableName: boolean; timestamps: boolean; classMethods: { associate(): void; }; }) => any; }} */ sequelize, /** @type {{ INTEGER: any; STRING: any; }} */ DataTypes) {
const User = sequelize.define(table, {
  user_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  verification_code: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  is_verified: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  is_deleted: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  created_by: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  updated_by: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
  hooks: {
    beforeCreate: (/** @type {{ password: string; }} */ user) => {
      user.password = encryptPassword(user.password)
    }
  },
  freezeTableName: true,
  timestamps: false,
  classMethods: {
    associate () {
      // associations can be defined here
    }
  }
})

return User;

}
