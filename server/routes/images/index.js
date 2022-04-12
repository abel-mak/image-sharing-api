const router = require("express").Router();
const multer = require("multer");
const crypto = require("crypto");
const { Fail, Success } = require("../../helper/response");
const authMiddleware = require("../../middlewares/auth");
const ERROR = require("../../helper/error");
const Image = require("../../models").Image;
const { upload } = require("../../helper/multer");

router.get("/", authMiddleware, async (req, res) => {
    try {
        const images = await Image.findAll();
        res.status(200).json(new Success(200, null, images));
    }
    catch (e) {
        res.status(500).json(new Fail(500, ERROR[500]));
    }
});

router.post("/new", authMiddleware, (req, res) => {
    try {
        upload.single("image")(req, res, async (err) => {
            if (err) {
                if (err instanceof multer.MulterError) {
                    res.status(400).json(new Fail(400, err.message));
                }
                else {
                    res.status(500).json(new Fail(500, ERROR[500]));
                }
            }
            else {
                const userId = req.userId;
                const { path } = req.file;
                console.log(userId, path);
                const image = await Image.create({ userId, path });
                res.json(req.file);
            }
        });
    }
    catch (e) {
        console.log(e);
        res.status(500).json(new Fail(500, ERROR[500]));
    }
});

module.exports = router;