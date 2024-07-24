"use strict";
const { Model } = require("sequelize");
const { hashedPassword } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class tbl_user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tbl_user.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: "username already exists",
        },
        validate: {
          notEmpty: { msg: "Username cannot be empty" },
          notNull: { msg: "Username cannot be empty" },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Password cannot be empty" },
          notNull: { msg: "Password cannot be empty" },
          length(value) {
            if (value.length < 5) {
              throw new Error("password length min. 5");
            }
            if (value.length > 8) {
              throw new Error("password length max. 8");
            }
          },
        },
      },
    },
    {
      sequelize,
      modelName: "tbl_user",
      hooks: {
        beforeCreate(instance, option) {
          const hash = hashedPassword(instance.password);

          instance.password = hash;
        },
        beforeUpdate(instance, option) {
          if (instance.changed("password")) {
            instance.password = hashedPassword(instance.password);
          }
        },
      },
    }
  );
  return tbl_user;
};
