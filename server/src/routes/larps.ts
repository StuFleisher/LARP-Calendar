import express from 'express';
import { Request, Response, NextFunction } from 'express';
import {
  ensureLoggedIn,
  ensureOrganizer,
  ensureOwnerOrAdmin
} from '../middleware/auth';
// import jsonschema from 'jsonschema';
const router = express.Router();

import LarpManager from '../models/LarpManager';

/** POST /
  *  Creates and returns a new larp record
  *
  * @returns larps: [Larp,...]
  * @auth organizer
  */
router.post(
  "/",
  ensureLoggedIn,
  ensureOrganizer,
  // readMultipart("image"),

  async function (req: Request, res: Response, next: NextFunction) {
    console.log('hit the route')
    const larp = await LarpManager.createLarp(req.body)
    return res.status(201).json({larp})
  }
);

/** GET /id
  *  Returns a the larp with the given id
  *
  * @returns larps: [Larp,...]
  * @auth none
  */
router.get(
  "/:id",
  async function (req: Request, res: Response, next: NextFunction) {
    const larp = await LarpManager.getLarpById(+req.params.id);
    return res.json({ larp });
  }
);

/** GET /
  *  Returns a list of all larps without submodel data
  *
  * @returns larps: [Larp,...]
  */

router.get(
  "/",
  async function (req: Request, res: Response, next: NextFunction) {
    const query = req.query.q;
    if (typeof query === "string") {
      const larps = await LarpManager.getAllLarps(query);
      return res.json({ larps });
    } else {
      const larps = await LarpManager.getAllLarps();
      return res.json({ larps });
    }
  }
);

/** DELETE /[id]
 *  Deletes a larp and its submodel data
 *
 * @returns {deleted: Larp}
 *
*/

router.delete(
  "/:id",
  ensureOwnerOrAdmin,
  async function (req: Request, res: Response, next: NextFunction) {
    const deleted = await LarpManager.deleteLarpById(+req.params.id);
    return res.json({ deleted });
  }
);

/** PUT /[id]
 * Updates a larp and its submodel data
 *
 * @returns {larp: Larp}
 */
router.put(
  "/:id",
  ensureOwnerOrAdmin,
  async function (req: Request, res: Response, next: NextFunction) {

    // const validator = jsonschema.validate(
    //   req.body,
    //   larpUpdateSchema,
    //   { required: true }
    // );
    // if (!validator.valid) {
    //   const errs: (string | undefined)[] = validator.errors.map((e: Error) => e.stack);
    //   throw new BadRequestError(errs.join(", "));
    // }
    const larp = await LarpManager.updateLarp(req.body);
    return res.json({ larp });
  }
);

export default router;