const handlerResponse = require('./handlerResponse');

const handlerValidator = (schema, property = 'body') => {
    return (req, res, next) => {
      const { error } = schema.validate(req[property], { abortEarly: false });
  
      if (error) handlerResponse.error(res, 'Error de validación', 400, error.details.map((err) => err.message));
  
      next();
    };
  };
  
  module.exports = handlerValidator;