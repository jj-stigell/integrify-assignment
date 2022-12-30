// third party
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

// project imports
import { hashPassword, hashCompare } from '../utils/hash';
import { User, Body, RequestIncludeUser } from '../interfaces';
import { userService } from '../services';
import config from '../configs/config';

/**
 * Sign up a new user.
 * @param {Request} req The request object.
 * @param {Response} res The response object.
 * @returns A promise that resolves to the response object.
 */
export const signUp = async (req: Request, res: Response): Promise<Response> => {
  const { email, password }: Body = req.body;

  if (!email || !password) return res.status(400).send({
    error: 'email or password missing'
  });

  try {
    const hashedPassword: string = await hashPassword(password);
    await userService.createUser(email, hashedPassword);

    return res.status(201).send({
      success: 'new user created succesfully'
    });
  } catch(error: any) {
    return res.status(500).send({
      error: error.message
    });
  }
};

/**
 * Sign in to an existing user.
 * @param {Request} req The request object.
 * @param {Response} res The response object.
 * @returns A promise that resolves to the response object.
 */
export const signIn = async (req: Request, res: Response): Promise<Response> => {
  const { email, password }: Body = req.body;

  if (!email || !password) return res.status(400).send({
    error: 'email or password missing'
  });

  try {
    const user: User | null = await userService.findUserByEmail(email);

    if (user === null) return res.status(404).send({
      error: `user with an email address ${email} not found`
    });

    const compare: boolean = await hashCompare(password, user.password);

    if (!compare) return res.status(403).send({
      error: 'password incorrect'
    });

    const token: string = jwt.sign(
      { userId: user.id },
      config.jwtSecret,
      { expiresIn: config.jwtExpiryTime }
    );

    return res.status(200).send({
      token: token
    });
  } catch(error: any) {
    return res.status(500).send({
      error: error.message
    });
  }
};

/**
 * Change a user's password.
 * @param {RequestIncludeUser} req The request object, which includes the user id in the request context.
 * @param {Response} res The response object.
 * @returns A promise that resolves to the response object.
 */
export const changePassword = async (req: RequestIncludeUser, res: Response): Promise<Response> => {
  const { password, newPassword }: Body = req.body;
  const userId: number = req.user;

  if (!password || !newPassword) return res.status(400).send({
    error: 'current password or new password missing'
  });

  if (password === newPassword) return res.status(400).send({
    error: 'new password cannot be same as current password'
  });

  try {
    const user: User | null = await userService.findUserById(userId);

    if (user === null) return res.status(404).send({
      error: `user with an id ${userId} not found`
    });
  
    const compare: boolean = await hashCompare(password, user.password);

    if (!compare) return res.status(403).send({
      error: 'current password incorrect'
    });

    const hashedPassword: string = await hashPassword(newPassword);
    await userService.updateUserPassword(userId, hashedPassword);

    return res.status(200).send({
      success: 'password changed succesfully'
    });
  } catch(error: any) {
    return res.status(500).send({
      error: error.message
    });
  }
};
