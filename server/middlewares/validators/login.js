const Joi = require("joi");
const { Fail } = require("../../helper/response");

module.exports = async (req, res, next) => {
    try {
        const schema = Joi.object({
            username: Joi.string().regex(/^[a-zA-Z0-9_]+/).min(3).max(30).required(),
            password: Joi.string().required()
        });
        const value = await schema.validateAsync(req.body);
        
        req.user = value;
        next();
    }
    catch (e) {
        const message = e.details.length != 0 ? e.details[0].message : "validation error";

        res.status(400).json(new Fail(400, message));
    }
}