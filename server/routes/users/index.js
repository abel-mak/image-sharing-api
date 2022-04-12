const router = require("express").Router();
const User = require("../../models").User;
const { Fail, Success } = require("../../helper/response");
const Image = require("../../models").Image;
const ERROR = require("../../helper/error");

router.get("/", async (req, res) => {
    try {
        const users = await User.findAll({
            include:[{
                model:Image,
            }]
        });
        res.status(200).json(new Success(200, null, users));
    }
    catch (e) {
        console.log(e);
        res.status(new Fail(500, ERROR[500]));
    }
});

module.exports = router;