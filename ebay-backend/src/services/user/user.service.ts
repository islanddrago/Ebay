import { LoginRequest } from "../../controllers/user/user.request";
import { LoginResponse } from "../../controllers/user/user.response";

/**
 * user.service.ts
 * contains function for performing business logic related to user requests
 */

const UserService = {
  getUserDetails(loginUserRequest: LoginRequest): LoginResponse {
    return new LoginResponse("TODO: implement this");
  },
};
export default UserService;
