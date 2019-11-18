import { Request, Response, Router } from "express";
import { getUserByID } from "../../db/user.db";
import UserService from "../../services/user/user.service";
import { LoginRequest } from "./user.request";

const router = Router();

// user routes
router.get("/", getLoggedInUser);
router.post("/login", loginUser);
router.get("/details", getUser);

function getLoggedInUser(req: Request, res: Response) {
  res.status(200).json(req.user);
}

function loginUser(req: Request, res: Response) {
  const request = req.body as LoginRequest;
  const response = UserService.loginUser(request);
  res.status(200).json(response);
}

// TODO: updates to the user are not reflected in the database
async function getUser(req: Request, res: Response) {
  // if the request gets here, the user
  const user = await getUserByID(req.headers.userid as string);
  res.status(200).json({ ...req.user, ...user });
}

export default router;
