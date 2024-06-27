import { Request, Response, NextFunction } from "express";
import express from 'express';
const router = express.Router();

import jsonschema from 'jsonschema';
import userAuthSchema from "../schemas/userAuth.json"
import userRegisterSchema from "../schemas/userRegister.json"

import { BadRequestError } from '../utils/expressError';
import { createToken } from "../utils/tokens";

import UserManager from '../models/UserManager';

router.post("/error", async ()=>{
  throw new BadRequestError("test error");
})

/** POST /auth/token:  { username, password } => { token }
 *
 * Returns JWT token which can be used to authenticate further requests.
 *
 * Authorization required: none
 */

router.post("/token", async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const validator = jsonschema.validate(
    req.body,
    userAuthSchema,
    {required: true}
  );
  if (!validator.valid) {
    const errs = validator.errors.map((e:Error)=> e.stack);
    throw new BadRequestError(errs.join(", "));
  }

  const { username, password } = req.body;
  const user = await UserManager.authenticate(username, password);
  const token = createToken(user);
  return res.json({ token });
});


/** POST /auth/register:   { user } => { token }
 *
 * user must include { username, password, firstName, lastName, email }
 *
 * Returns JWT token which can be used to authenticate further requests.
 *
 * Authorization required: none
 */

router.post("/register", async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const validator = jsonschema.validate(
    req.body,
    userRegisterSchema,
    {required: true}
  );
  if (!validator.valid) {
    const errs = validator.errors.map((e:Error) => e.stack);
    throw new BadRequestError(errs.join(", "));
  }

  const newUser = await UserManager.register({
    ...req.body,
    isAdmin: false, 
    isOrganizer:false
  });
  const token = createToken(newUser);
  return res.status(201).json({ token });
});

export default router;