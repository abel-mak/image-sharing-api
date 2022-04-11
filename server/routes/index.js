const express = require("express");
const router = express.Router();
const auth = require("./auth");
const users = require("./users");
const images = require("./images");


router.use("/auth", auth);
router.use("/users", users);
router.use("/images", images);

module.exports = router;