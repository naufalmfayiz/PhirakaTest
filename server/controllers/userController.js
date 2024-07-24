const { checkPassword } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
const { tbl_user } = require("../models");
const axios = require("axios");

class UserController {
  static async register(req, res, next) {
    try {
      let { username, password } = req.body;
      if (!username || !password) {
        throw { name: "InvalidInput" };
      }

      let user = await tbl_user.create({ username, password });
      delete user.dataValues.password;

      res.status(201).json({ user });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      let { username, password, reCaptchaToken } = req.body;
      if (!username || !password) {
        throw { name: "InvalidInput" };
      }

      const secretKey = process.env.RECAPTCHA_SECRET_KEY;

      let user = await tbl_user.findOne({ where: { username } });
      if (!user) {
        throw { name: "InvalidUser" };
      }

      const response = await axios.post(
        `https://www.google.com/recaptcha/api/siteverify`,
        null,
        {
          params: {
            secret: secretKey,
            response: reCaptchaToken,
          },
        }
      );
      // console.log(response.data);

      const { success } = response.data;

      if (!success) {
        throw { name: "ReCaptchaFailed" };
      }

      let comparePassword = checkPassword(password, user.password);
      if (!comparePassword) {
        throw { name: "InvalidUser" };
      }

      let access_token = createToken({
        id: user.id,
      });

      res.status(200).json({ access_token, username });
    } catch (error) {
      next(error);
    }
  }

  static async getUser(req, res, next) {
    try {
      const users = await tbl_user.findAll();
      res.status(200).json(users);
    } catch (error) {
      next(error);
      // console.log(error);
    }
  }

  static async getUserById(req, res, next) {
    try {
      let id = req.params.id;
      let user = await tbl_user.findByPk(id);
      if (!user) throw { name: "NotFound" };

      res.status(200).json(user);
    } catch (error) {
      next(error);
      console.log(error);
    }
  }

  static async updateUSerById(req, res, next) {
    try {
      let { username, password } = req.body;
      let id = req.params.id;
      let user = await tbl_user.findByPk(id);
      if (!user) throw { name: "NotFound" };

      let updatedUser = await tbl_user.update(
        { username, password },
        { where: { id }, individualHooks: true }
      );
      res.status(200).json({ user });
    } catch (error) {
      next(error);
      console.log(error);
    }
  }

  static async deleteUserById(req, res, next) {
    try {
      let id = req.params.id;
      let user = await tbl_user.findByPk(id);
      if (!user) throw { name: "NotFound" };

      const deletedUser = await tbl_user.destroy({ where: { id } });
      res.status(200).json({ message: `User ${user.id} deleted successfully` });
    } catch (error) {
      next(error);
      console.log(error);
    }
  }
}

module.exports = UserController;
