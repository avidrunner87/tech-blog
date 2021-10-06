'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

module.exports = (sequelize, DataTypes) => {
    class Post extends Model {
        static associate(model) {
            Post.belongsTo(model.User, {
              onDelete: 'CASCADE'
            });
        }
    }
    Post.init(
        {
            id: {
              type: DataTypes.UUID,
              allowNull: false,
              primaryKey: true
            },
            title: {
              type: DataTypes.STRING,
              allowNull: false
            },
            content: {
              type: DataTypes.STRING,
              allowNull: false
            }
        },
        {
          sequelize,
          underscored: true,
          modelName: 'Post'
      }
    );
    return Post;
};
