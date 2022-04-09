const jwt = require("jsonwebtoken");
const {Fail, Success} = require("../../helper/response");

module.exports = (req, res) => {
    try {
        const token = req.header("authorization").split(" ")[1];

        if (token) {
            jwt.verify(token, process.env.SECRET, (err, decoded) => {
                if (err)
                    res.status(401).json(new Fail(401, "unauthorized"));
                req.userId = decoded.userId;
                
                next();
            })
        }
        else {
            res.status(400).json(new Fail(400, "bad request"));
        }
    }
    catch (e) {
        console.log(e);
        res.status(500).json(new Fail(500, "internal error server"));
    }
}