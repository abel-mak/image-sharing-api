const signup = require("./signup");
const login = require("./login");
const logout = require("./logout");

const express = require("express");
const router = express.Router();

router.use("/signup", signup);
router.use("/login", login);
router.use("/logout", logout);

module.exports = router;