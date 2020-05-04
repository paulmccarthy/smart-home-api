const Joi = require('@hapi/joi');

const getStateSchema = Joi.object({
    deviceName: Joi.string().required(),
    apiKey: Joi.string().required()
}).required();

const setStateSchema = Joi.object({
    deviceName: Joi.string().required(),
    state: Joi.alternatives().try(Joi.number(), Joi.string()).required(),
    apiKey: Joi.string().required()
}).required();

module.exports = {
    validateGetState(req, res, next) {
        const { error } = getStateSchema.validate(req.body);

        if (error) {
            next(error);
        } else {
            next();
        }
    },
    validateSetState(req, res, next) {
        const { error } = setStateSchema.validate(req.body);

        if (error) {
            next(error);
        } else {
            next();
        }
    }
};
