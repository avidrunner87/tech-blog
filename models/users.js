'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        checkPassword(loginPw) {
            return bcrypt.compareSync(loginPw, this.password);
        }

        static associate(model) {
            User.hasMany(model.Post);
        }

    }
    User.init(
        {
            id: {
              type: DataTypes.UUID,
              allowNull: false,
              primaryKey: true
            },
            email: {
              type: DataTypes.STRING,
              allowNull: false,
              unique: true,
              validate: {
                isEmail: true
              }
            },
            password: {
              type: DataTypes.STRING,
              allowNull: false,
              validate: {
                len: [8]
              }
            }
        },
        {
            hooks: {
              async beforeCreate(newUserData) {
                  newUserData.password = await bcrypt.hash(
                      newUserData.password,
                      10
                  );
                  return newUserData;
              },
              async beforeUpdate(updatedUserData) {
                  updatedUserData.password = await bcrypt.hash(
                      updatedUserData.password,
                      10
                  );
                  return updatedUserData;
              }
            },
            sequelize,
            underscored: true,
            modelName: 'User'
        }
    );

    return User;
};
