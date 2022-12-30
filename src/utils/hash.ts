// third party
import bcrypt from 'bcrypt';

// project imports
import config from '../configs/config';

/**
 * Compare user submitted plain-text password to hash.
 * @param {string} password User submitted password in plain-text.
 * @param {string} hash Users hashed password from database.
 * @returns {boolean} True if hash match, false if no match.
 * @throws {Error} If error occurs during comparing the password and hash.
 */
export const hashCompare = async (password: string, hash: string): Promise<boolean> => {
  try {
    return await bcrypt.compare(password, hash);
  } catch (error: unknown) {
    console.log(error);
    throw new Error('error comparing passwords');
  }
};

/**
 * Hash the user submitted plain-text password.
 * Salt is added according to congif file settings.
 * @param {string} password Users password string.
 * @returns {string} Hashed password string.
 * @throws {Error} If error occurs during hashing the password.
 */
export const hashPassword = async (password: string): Promise<string> => {
  try {
    return await bcrypt.hash(password, config.saltRounds);
  } catch (error: unknown) {
    console.log(error);
    throw new Error('error hashing password');
  }
};
