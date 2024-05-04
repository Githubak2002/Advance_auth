
const errorHandler = (statusCode,success,msg) => {
  const err = new Error();
  err.statusCode = statusCode;
  err.message = msg;
  err.success = success;
  return err
};

export default errorHandler