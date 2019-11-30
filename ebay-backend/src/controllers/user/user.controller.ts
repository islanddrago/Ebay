import { Request, Response, Router } from "express";
import { getUserByID } from "../../db/user.db";
import UserService from "../../services/user/user.service";
import { LoginRequest } from "./user.request";

const router = Router();

// user routes
router.get("/:userID", getUser);

/**
 * update user details
 */
// function updateUser(req: Request, res: Response) {

// }

// TODO: updates to the user are not reflected in the database
async function getUser(req: Request, res: Response) {
  const userID = req.params.userID;
  const user = await getUserByID(userID);
  // if the requesting user is the logged in user, return all details
  if (req.headers.user_id === userID) {
    const response = { ...req.user, ...user };
    res.status(200).json({ user: response });
    return;
  }

  // return the user
  res.status(200).json({ user });
}

export default router;
