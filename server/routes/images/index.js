const router = require("express").Router();
const multer = require("multer");
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

// req.file contains file information 

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
            else if (req.file) {
                const userId = req.userId;
                const { path } = req.file;
                const image = await Image.create({ userId, path });
                res.status(200).json(new Success(200, null, { path }));
                // res.json(req.file);
            }
            else {
                res.status(400).json(new Fail(400, ERROR[400]));
            }
        });
    }
    catch (e) {
        console.log(e);
        res.status(500).json(new Fail(500, ERROR[500]));
    }
});

router.get("/:imageId", authMiddleware, async (req, res) => {
    try {
        const imageId = req.params.imageId;
        const image = await Image.findOne({
            where: {
                id: imageId
            }
        });
        if (image)
            res.status(200).json(new Success(200, null, image));
        else
            res.status(404).json(new Fail(404, ERROR[404]));
    }
    catch (e) {
        console.log(e);
        res.status(500).json(new Fail(500, ERROR[500]));
    }
});

router.delete("/remove/:imageId", authMiddleware, async (req, res) => {
    try {
        const imageId = req.params.imageId;
        const image = await Image.findOne({
            where: {
                id: imageId
            },
            raw: true,
        });

        if (image) {
            if (image.userId != req.userId)
                return res.status(403).json(new Fail(403, ERROR[403]));
            else {
                await Image.destroy({
                    where: {
                        id: imageId
                    }
                });
            }
        }
        res.status(200).json(new Success(200, "resource deleted successfully"));
    }
    catch (e) {
        console.log(e);
        res.status(500).json(new Fail(500, ERROR[500]));
    }
});

module.exports = router;