"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      models.Post.hasMany(models.Comment, {
        foreignKey: "Post_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      models.Comment.belongsTo(models.Post, { foreignKey: "Post_id" });
    }
  }
  Post.init(
    {
      User_id: DataTypes.INTEGER,
      content: DataTypes.TEXT,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Post",
    }
  );
  return Post;
};
