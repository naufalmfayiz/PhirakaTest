const { verifyToken } = require("../helpers/jwt");
const { tbl_user } = require("../models");

const authentication = async (req, res, next) => {
  try {
    // console.log(req.headers.authorization);
    let access_token = req.headers.authorization;
    if (!access_token) {
      throw { name: "InvalidToken" };
    }

    let split_token = access_token.split(" ");
    let [bearer, token] = split_token;
    if (bearer !== "Bearer") {
      throw { name: "InvalidToken" };
    }

    let payload = verifyToken(token);
    let user = await tbl_user.findByPk(payload.id);

    if (!user) {
      throw { name: "InvalidToken" };
    }

    req.user = {
      id: user.id,
    };

    next();
  } catch (error) {
    next(error);
    console.log(error);
  }
};

module.exports = authentication;
