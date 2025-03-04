const Joi = require('joi');

const ascensorSchema = Joi.object({
    open: Joi.number().valid(0, 1).required(),
    currentFloor: Joi.number().greater(0).required(),
    state: Joi.number().valid(0, 1).required(),
});


module.exports = {
    ascensorSchema
};