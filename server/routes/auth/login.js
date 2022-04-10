const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const loginValidator = require("../../middlewares/validators/login");
const User = require("../../models").User;
const { Fail, Success } = require("../../helper/response");

router.post("/", loginValidator, async (req, res) => {
    try {
        const { username, password } = req.user;
        const tmpUser = await User.findOne({
            where: {
                username
            }
        });
        
        const result = await bcrypt.compare(password, tmpUser.password); 
        if (result) {
            const token = jwt.sign({userId: tmpUser.id}, "SECRET");

            return res.status(200).json(new Success(200, null, {token}));
        }
        res.status(401).json(new Fail(401, "invalid credentials"));
    }
    catch (e) {
        console.log(e);
        res.status(500).json(new Fail(500, "internal server error"));
    }
});

module.exports = router