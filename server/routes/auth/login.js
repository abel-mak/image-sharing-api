const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const loginValidator = require("../../middlewares/validators/login");
const User = require("../../models").User;
const { Fail, Success } = require("../../helper/response");
const ERROR = require("../../helper/error");

require("dotenv").config();

router.post("/", loginValidator, async (req, res) => {
    try {
        const { username, password } = req.user;
        const tmpUser = await User.findOne({
            where: {
                username
            }
        });
        if (tmpUser) {
            const { id, role } = tmpUser;
            const result = await bcrypt.compare(password, tmpUser.password);
            if (result) {
                const token = jwt.sign({ userId: tmpUser.id, role }, process.env.SECRET);

                return res.status(200).json(new Success(200, null, { token }));
            }
        }
        res.status(401).json(new Fail(401, "invalid credentials"));
    }
    catch (e) {
        console.log(e);
        res.status(500).json(new Fail(500, ERROR[500]));
    }
});

module.exports = router