const router = require("express").Router();
const { Success } = require("../../helper/response");

router.get("/", (req, res) => {
    res.status(200).json(new Success(200, "welcome to image upload api"));
});

module.exports = router;