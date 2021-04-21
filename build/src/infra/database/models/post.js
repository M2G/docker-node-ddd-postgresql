"use strict";
module.exports = function (sequelize, DataTypes) {
    const Post = sequelize.define('test_tb', {
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
    }, {
        freezeTableName: true,
        timestamps: false,
        classMethods: {
            associate() { }
        }
    });
    return Post;
};
//# sourceMappingURL=post.js.map