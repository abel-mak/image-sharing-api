const jwt = require("jsonwebtoken");

module.exports = (req, res) => {
    try {
        const token = req.header("authorization").split(" ")[1];

        if (token) {
            jwt.verify(token, process.env.SECRET, (err, decoded) => {
                if (err)
                    res.status(403).json({ code: 403, error: true });
                req.userId = decoded.userId;
                next();
            })
        }
        else {
            res.status(401).json({ code: 401, error: true });
        }
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ code: 500, error: true});
    }
}