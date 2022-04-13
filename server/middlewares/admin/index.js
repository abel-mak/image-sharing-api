const { Fail } = require("../../helper/response")
const authMiddleware = require("../auth");
const ERROR = require("../../helper/error");

module.exports = (req, res, next) => {
    if (req.role == "admin")
        next();
    else {
        res.status(403).json(new Fail(403, ERROR[403]));
    }
}