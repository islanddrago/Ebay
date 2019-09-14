import { Request, Response, Router } from "express";
import UserService from "../../services/user/user.service";
import { LoginRequest } from "./user.request";

const router = Router();

// user routes
router.post("/login", loginUser);

function loginUser(req: Request, res: Response) {
  const request = req.body as LoginRequest;
  const response = UserService.loginUser(request);
  res.status(200).json(response);
}

export default router;
