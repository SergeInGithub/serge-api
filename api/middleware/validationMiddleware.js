// this is the middleware which will accept a schema as a paramter and return an error in case of one, else it will allow to move unto the next logical step in the request-response cycle.

exports.validate = (schema) => (req, res, next) => {
  const {
    error
  } = schema.validate(req.body);
  if (error) {
    res.status(405)
      .send(error.details[0].message);
  } else {
    next();
  }
};
