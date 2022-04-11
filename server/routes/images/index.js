const router = require("express").Router();
const multer = require("multer");
const upload = multer({ dest: 'uploads/' });
const { Fail, Success } = require("../../helper/response");
const authMiddleware = require("../../middlewares/auth");

router.get("/", authMiddleware, (req, res) => {
    res.json(new Success(200, "hello images"));
})

router.post("/new", upload.single("image"), (req, res) => {
    res.json(req.file);
});

module.exports = router;