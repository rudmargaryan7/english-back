import { validationResult } from "express-validator";

const ErrorRequest = (req) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return errors.array();
  }
  return [];
};

export default ErrorRequest;
