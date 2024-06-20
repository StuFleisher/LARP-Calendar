import * as jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config";
import { PublicUser, User, UserForCreate } from "../types";

/** return signed JWT {username, isAdmin} from user data. */


function createToken(user:PublicUser) {
  console.assert(user.isAdmin !== undefined,
      "createToken passed user without isAdmin property");
  console.assert(user.isOrganizer !== undefined,
      "createToken passed user without isOrganizer property");

  let payload = {
    username: user.username,
    isOrganizer: user.isOrganizer || false,
    isAdmin: user.isAdmin || false,
  };

  return jwt.sign(payload, SECRET_KEY);
}

export { createToken };
