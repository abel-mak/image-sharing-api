const express = require("express");
const { sha256 } = require("crypto-js");
const User = require("../../models/user");
const router = express.Router();

router.post("/", (req, res) => {
    try {
        const { firstName, lastName, username, password } = req.body;
        const hashedPassword = sha256(password);

        await User.create({ firstName, lastName, username, hashedPassword });
        res.json({ message: "user created succefuly!" });
    }
    catch (e) {
        console.log(e);
    }
})

module.exports = router;

