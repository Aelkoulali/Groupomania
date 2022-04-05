"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      models.User.hasMany(models.Post, {
        foreignKey: "User_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      models.Post.belongsTo(models.User, { foreignKey: "User_id" });

      models.User.hasMany(models.Comment, {
        foreignKey: "User_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      models.Comment.belongsTo(models.User, { foreignKey: "User_id" });
    }
  }
  User.init(
    {
      firstName: { type: DataTypes.STRING, allowNull: false },
      lastName: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      password: { type: DataTypes.STRING, allowNull: false },
      avatar: { type: DataTypes.STRING, allowNull: true },
      isAdmin: { type: DataTypes.BOOLEAN, defaultValue: 0 },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
