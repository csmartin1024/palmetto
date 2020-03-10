import { v4 as uuidv4 } from 'uuid';

export const middleware = (req, _, next) => {
  req.tracer = uuidv4();
  next();
};
