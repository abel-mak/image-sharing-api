const express = require("express");
const router = express.Router();
const auth = require("./auth");
const users = require("./users");
const images = require("./images");
const home = require("./home");

router.use("/auth", auth);
router.use("/users", users);
router.use("/images", images);
router.use("/", home);

module.exports = router;