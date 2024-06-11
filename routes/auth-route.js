const express = require('express');
const route = express.Router();

const { loginAction, registerAction } = require("../controllers/authController");

route.post("/login", loginAction);
route.post("/register", registerAction);

module.exports = route