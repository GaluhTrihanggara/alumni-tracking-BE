const express = require('express');
const route = express.Router();
const authenticate = require('../middleware/auth')

const { 
    loginAction, 
    registerAction, 
    getProfile, 
    updateProfile,
    submitProfileChanges } = require("../controllers/authController");

route.post("/login", loginAction);
route.post("/register", registerAction);
route.get("/profile", authenticate, getProfile);
route.put("/profile", authenticate, updateProfile);
route.post("/submit-profile-changes", authenticate, submitProfileChanges);
module.exports = route