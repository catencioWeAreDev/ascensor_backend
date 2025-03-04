const handlerResponse = {
    success: (res, data, message = 'Operación exitosa', statusCode = 200) => {
      res.status(statusCode).json({
        success: true,
        message,
        data,
      });
    },
  
    error: (res, message = 'Error en la solicitud', statusCode = 400, details = []) => {
      res.status(statusCode).json({
        success: false,
        message,
        details,
      });
    },
  };
  
  module.exports = handlerResponse;