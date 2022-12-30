// third party
import { Response, NextFunction } from 'express';
import { RequestIncludeUser } from '../interfaces';
import * as jwt from 'jsonwebtoken';

// project imports
import config from '../configs/config';

/**
 * Middleware function that authenticates a user's request based on a JWT.
 * Add user id from the JWT to the request.
 * @param {RequestIncludeUser} req The request object, which includes the user id in the request context.
 * @param {Response} res The response object.
 * @param {NextFunction} next Express next middleware function
 */
const authenticate = async (req: RequestIncludeUser, res: Response, next: NextFunction): Promise<unknown> => {
  const authHeader: string | undefined = req.headers['authorization'];

  if (authHeader && authHeader.toLowerCase().startsWith('bearer ')) {
    try {
      const payload: string | jwt.JwtPayload = jwt.verify(
        authHeader.substring(7), config.jwtSecret
      );
      if (typeof payload === 'string') throw new Error('jwt invalid');
      req.user = payload.userId;
      next();
    } catch(error: any) {
      return res.status(401).send({
        error: error.message
      });
    }
  } else {
    return res.status(401).send({
      error: 'authorization token missing or invalid'
    });
  }
};

export default authenticate;
