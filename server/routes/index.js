const express = require("express");
const UserController = require("../controllers/userController");
const authentication = require("../middlewares/authenticate");
const router = express.Router();

//HOME
router.get("/", (req, res) => {
  res.status(200).json("Welcome to Users API");
});

// <<<< USER >>>
//Login
router.post("/login", UserController.login);
//register
router.post("/register", UserController.register);
//all users
router.get("/users", authentication, UserController.getUser);
//get user by id
router.get("/users/:id", authentication, UserController.getUserById);
//update user
router.put("/users/:id", authentication, UserController.updateUSerById);
//delete user
router.delete("/users/:id", authentication, UserController.deleteUserById);

module.exports = router;
