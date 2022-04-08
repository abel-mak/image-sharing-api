const express = require("express");
const { User } = require("../../models");
const bcrypt = require("bcrypt");
const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const saltRounds = 10;
        const { firstName, lastName, username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        await User.create({ firstName, lastName, username, password: hashedPassword});
        res.json({ message: "user created succefuly!" });
    }
    catch (e) {
        console.log(e);
    }
})

module.exports = router;
