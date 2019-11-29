import { Request, Response, Router } from "express";
import { getUserByID } from "../../db/user.db";
import UserService from "../../services/user/user.service";
import { LoginRequest } from "./user.request";

const router = Router();

// user routes
router.get("/", getLoggedInUser);
router.get("/:userID", getUser);

async function getLoggedInUser(req: Request, res: Response) {
  // if the request gets here, the user
  const user = await getUserByID(req.headers.userid as string);
  res.status(200).json({ ...req.user, ...user });
}

/**
 * update user details
 */
function updateUser(req: Request, res: Response) {
  
}

// TODO: updates to the user are not reflected in the database
async function getUser(req: Request, res: Response) {
  // if the request gets here, the user
  const user = await getUserByID(req.headers.userid as string);
  res.status(200).json({ ...req.user, ...user });
}

export default router;
