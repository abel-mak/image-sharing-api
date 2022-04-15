const express = require("express");
const { User } = require("../../models");
const bcrypt = require("bcrypt");
const router = express.Router();
const signupValidator = require("../../middlewares/validators/signup");
const { Fail, Success } = require("../../helper/response");
const ERROR = require("../../helper/error");

router.post("/", signupValidator, async (req, res) => {
    try {
        const saltRounds = 10;
        const { firstName, lastName, username, password } = req.newUser;
        const userExist = await User.findOne({
            where:{
                username
            }
        });
        if (userExist)
            return res.status(409).json(new Fail(409, "username already exist"));

        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const user = await User.create({
            firstName,
            lastName,
            username,
            password: hashedPassword,
            role: "user"
        });
        res.status(201).json(new Success(201, "user created successfully"));
    }
    catch (e) {
        console.log(e);
        res.status(500).json(new Fail(500, ERROR[500]));
    }
})

module.exports = router;
