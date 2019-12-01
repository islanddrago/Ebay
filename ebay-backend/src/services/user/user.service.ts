import { UpdateUserRequest } from "../../controllers/user/user.request";
import { updateUser } from "../../db/user.db";
import { User } from "../../models/user.model";

/**
 * user.service.ts
 * contains function for performing business logic related to user requests
 */

const UserService = {
  async updateUser(user: User, updateRequest: UpdateUserRequest): Promise<User> {
    if (!!(updateRequest as any).user_id) {
      delete (updateRequest as any).user_id;
    }
    const newUserData = { ...user, ...updateRequest } as User;
    return updateUser(newUserData);
  },
};
export default UserService;
