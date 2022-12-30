// project imports
import { User } from '../models';

/**
 * Create a new user.
 * @param {string} email Users email, unique.
 * @param {string} hashedPassword Hashed password.
 * @returns {User} Newly created user object from database.
 * @throws {Error} If error occurs during the user creation process.
 */
const createUser = async (email: string, hashedPassword: string): Promise<User> => {
  try {
    return await User.create({
      email: email,
      password: hashedPassword
    });
  } catch (error: unknown) {
    console.log(error);
    throw new Error('error creating a new user');
  }
};

/**
 * Find a user from the database based on its id (PK)
 * @param {number} userId Users unique id number.
 * @returns {User} User found from the database.
 * @throws {Error} If error occurs during the query.
 */
const findUserById = async (userId: number): Promise<User | null> => {
  try {
    return await User.findByPk(userId);
  } catch (error: unknown) {
    console.log(error);
    throw new Error('error finding user by id');
  }
};

/**
 * Find a user from the database based on the email address.
 * @param {string} email Users email.
 * @returns {User} User found from the database.
 * @throws {Error} If error occurs during the query.
 */
const findUserByEmail = async (email: string): Promise<User | null> => {
  try {
    return await User.findOne({
      where: {
        email: email
      }
    });
  } catch (error: unknown) {
    console.log(error);
    throw new Error('error finding user by email');
  }
};

/**
 * Update user password.
 * @param {number} userId Users unique id number.
 * @param {string} hashedPassword Hashed password.
 * @throws {Error} If error occurs during the query.
 */
const updateUserPassword = async (userId: number, hashedPassword: string): Promise<void> => {
  try {
    const user: User | null = await User.findByPk(userId);
    if (!user) throw new Error();
    await user?.update({
      password: hashedPassword
    });
    await user?.save();
  } catch (error: unknown) {
    console.log(error);
    throw new Error('error changing password');
  }
};

export {
  createUser,
  findUserById,
  findUserByEmail,
  updateUserPassword
};
