const Joi = require("joi");
const { Fail } = require("../../helper/response");

module.exports = async (req, res, next) => {
    try {
        const schema = Joi.object({
            firstName: Joi.string().regex(/[a-zA-Z]+/).min(3).max(20).required(),
            lastName: Joi.string().regex(/[a-zA-Z]+/).min(3).max(20).required(),
            password: Joi.string().min(8).required(),
            username: Joi.string().regex(/^[a-zA-Z0-9_]+/).min(3).max(30).required(),
        });
        const value = await schema.validateAsync(req.body);

        next();
    }
    catch (e) {
        const message = e.details.length != 0 ? e.details[0].message : "validation error";

        res.status(400).json(new Fail(400, message));
    }
}