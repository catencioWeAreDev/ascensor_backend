const Joi = require('joi');

const floorSchema = Joi.object({
    floor: Joi.number().greater(0).required(),
    direction: Joi.string().valid('up', 'down', 'stay').required(),
});


module.exports = {
    floorSchema
};