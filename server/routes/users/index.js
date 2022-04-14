const router = require("express").Router();
const User = require("../../models").User;
const { Fail, Success } = require("../../helper/response");
const Image = require("../../models").Image;
const ERROR = require("../../helper/error");
const sequelize = require("sequelize");
const authMiddleware = require("../../middlewares/auth");
const adminMiddleware = require("../../middlewares/admin");

router.get("/", authMiddleware, async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: ["id", "firstName", "lastName", "username", "role"]
        });
        res.status(200).json(new Success(200, null, users));
    }
    catch (e) {
        console.log(e);
        res.status(new Fail(500, ERROR[500]));
    }
});

router.get("/:userId", authMiddleware, async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findOne({
            attributes: ["id", "firstName", "lastName", "username", "role"],
            include: [{
                model: Image,
            }],
            where:{
                id: userId
            }
        });
        
        if (user)
            res.status(200).json(new Success(200, null, user));
        else
            res.status(400).json(new Fail(404, null));
    }
    catch (e) {
        console.log(e);
        res.status(new Fail(500, ERROR[500]));
    }
})

router.delete("/remove/:userId", authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const userId = req.params.userId;
        const adminUserId = { req };

        if (userId != adminUserId) {
            await User.destroy({
                where: {
                    id: userId
                }
            });
        }
        return res.status(200).json(new Success(200, null));
    }
    catch (e) {
        console.log(e);
        res.status(500).json(new Fail(500, ERROR[500]));
    }
});

module.exports = router;