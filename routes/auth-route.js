const express = require('express');
const route = express.Router();
const authenticate = require('../middleware/auth')

const { loginAction, registerAction, getProfile, updateProfile } = require("../controllers/authController");

route.post("/login", loginAction);
route.post("/register", registerAction);
route.get("/profile", authenticate, getProfile);
route.put("/profile", authenticate, updateProfile);
module.exports = route