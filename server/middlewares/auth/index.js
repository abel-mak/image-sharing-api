const jwt = require("jsonwebtoken");
const { Fail, Success } = require("../../helper/response");
const ERROR = require("../../helper/error");
require("dotenv").config();

module.exports = (req, res, next) => {
    try {
        if (!req.header("authorization"))
            res.status(400).json(new Fail(400, ERROR[400]));
        const token = req.header("authorization").split(" ")[1];

        if (token) {
            jwt.verify(token, process.env.SECRET, (err, decoded) => {
                if (err)
                    res.status(401).json(new Fail(401, ERROR[401]));
                req.userId = decoded.userId;
                req.role = decoded.role;
                next();
            })
        }
        else {
            res.status(400).json(new Fail(400, ERROR[400]));
        }
    }
    catch (e) {
        console.log(e);
        res.status(500).json(new Fail(500, ERROR[500]));
    }
}