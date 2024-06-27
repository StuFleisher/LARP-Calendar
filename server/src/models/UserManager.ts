import { prisma } from '../prismaSingleton';
import { BCRYPT_WORK_FACTOR } from '../config';
import { UserForCreate, User, UserForUpdate, PublicUser } from '../types';

import bcrypt from "bcrypt";

import {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} from '../utils/expressError';

class UserManager {

  /**Authenticate a user with username/password
 * Returns User
 * Throws UnauthorizedError is user not found or wrong password.
*/
  static async authenticate(
    username: string,
    password: string,
  ): Promise<PublicUser> {

    const fullUserData = await prisma.user.findUnique({
      where: { username: username }
    });

    if (fullUserData) {
      const isValid = await bcrypt.compare(password, fullUserData.password);
      if (isValid === true) {
        const { password, ...publicUserData } = fullUserData;
        let user: PublicUser = publicUserData;
        return user;
      }
    }
    throw new UnauthorizedError("Invalid username/password");
  }



  /** Register a user with userdata
    * Returns User
    * Throws BadRequestError on duplicates
    */
  static async register(userData: UserForCreate): Promise<PublicUser> {
    //duplicate check
    const user = await prisma.user.findUnique({
      where: { username: userData.username }
    });

    if (user) throw new BadRequestError(`Username ${user.username} already exists`);
    const email = await prisma.user.findUnique({
      where: { email: userData.email }
    });
    if (email) throw new BadRequestError("An account with that email address already exists");

    const hashedPassword = await bcrypt.hash(userData.password, BCRYPT_WORK_FACTOR);
    userData.password = hashedPassword;


    const savedUser = await prisma.user.create({
      data: userData
    });
    const {password, ...publicUser} = savedUser;
    return publicUser;
  }


  /** Returns a list of userData without passwords */
  static async findAll(): Promise<PublicUser[]> {
    let users = await prisma.user.findMany();
    const response = users.map((user: User) => {
      const {password, ...publicUser} = user;
      return publicUser;
    });

    return response;
  }


  /** Fetches a User by username.
   * Returns {username, firstName, lastName, email, isAdmin}
   * Throws NotFoundError on missing record
   */
  static async getUser(id: number): Promise<PublicUser> {
    try {
      let user:User = await prisma.user.findUniqueOrThrow({
        where: { id },
      });
      const {password, ...publicUser} = user;
      return publicUser;
    } catch (err) {
      throw new NotFoundError("User not found");
    }
  }


  /** Update user data with `data`.
   *
   * This is a "partial update" --- it's fine if data doesn't contain
   * all the fields; this only changes provided ones.
   *
   * Data can include:
   *   { firstName, lastName, password, email, isAdmin }
   *
   * Returns { username, firstName, lastName, email, isAdmin }
   *
   * Throws NotFoundError if not found.
   *
   * WARNING: this function can set a new password or make a user an admin.
   * Callers of this function must be certain they have validated inputs to this
   * or a serious security risks are opened.
   */
  static async updateUser(
    id: number, userData: UserForUpdate
  ): Promise<PublicUser> {
    if (userData.password) {
      userData.password = await bcrypt.hash(userData.password, BCRYPT_WORK_FACTOR);
    }

    if (!userData || !Object.keys(userData).length) {
      throw new BadRequestError("No data provided");
    }

    try {
      const updatedUser = await prisma.user.update({
        where: {
          id: id,
        },
        data: userData
      });
      const {password,...publicUser} = updatedUser;
      return publicUser;
    } catch (err) {
      console.log(err);
      throw new NotFoundError('User not found');
    }
  }


    /** Delete given user from database; returns undefined. */
    static async deleteUser(id: number) {
      try {
        const deleted = await prisma.user.delete({
          where: { id }
        });
        return deleted.username
      } catch (err) {
        throw new NotFoundError("User not found");
      }
    }

  // end class
};

export default UserManager