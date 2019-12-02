import { Request, Response, Router } from "express";
import { getUserByID } from "../../db/user.db";
import { authenticate, jwtCheck } from "../../middleware/authentication.middleware";
import UserService from "../../services/user/user.service";
import { UpdateUserRequest } from "./user.request";

const router = Router();

// user routes
router.get("/:userID", jwtCheck, authenticate, getUser);
router.put("/", jwtCheck, authenticate, updateUser);

/**
 * update user details
 */
async function updateUser(req: Request, res: Response) {
  const userToUpdate = await getUserByID(req.headers.userid as string);
  if (!userToUpdate) {
    res.status(404).json({ error: "Could not find user with id " + req.headers.userid });
    return;
  }
  const updateRequest = req.body as UpdateUserRequest;
  try {
    const user = UserService.updateUser(userToUpdate, updateRequest);
    res.status(200).json({ user });
  } catch ({ message: error }) {
    console.log("err: ", error);
    res.status(500).json({ error });
  }
}

// TODO: updates to the user are not reflected in the database
async function getUser(req: Request, res: Response) {
  const userID = req.params.userID;
  const user = await getUserByID(userID);
  // if the requesting user is the logged in user, return all details
  if (req.headers.userid === userID) {
    const response = { ...req.user, ...user };
    res.status(200).json({ user: response });
    return;
  }

  // return the user
  res.status(200).json({ user });
}

export default router;
