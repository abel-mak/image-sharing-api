const express = require("express");
const { User } = require("../../models");
const bcrypt = require("bcrypt");
const router = express.Router();
const signupValidator = require("../../middlewares/validators/signup");
const { Fail, Success } = require("../../helper/response");

router.post("/", signupValidator, async (req, res) => {
    try {
        const saltRounds = 10;
        const { firstName, lastName, username, password } = req.newUser;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const user = await User.create({ firstName, lastName, username, password: hashedPassword });
        res.status(201).json(new Success(201, "user created successfully"));
    }
    catch (e) {
        console.log(e);
        res.status(500).json(new Fail(500, "internal server error"));
    }
})

module.exports = router;
