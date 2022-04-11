const router = require("express").Router();
const User = require("../../models").User;
const { Fail, Success } = require("../../helper/response");

router.get("/", async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(new Success(200, null, users));
    }
    catch (e) {
        console.log(e);
        res.status(new Fail(500, "internal server error"));
    }
});

module.exports = router;