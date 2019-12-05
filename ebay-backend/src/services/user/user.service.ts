import { UpdateUserRequest, GetUsersRequest } from "../../controllers/user/user.request";
import { updateUser, getUserByID } from "../../db/user.db";
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

  async getUsers(request: GetUsersRequest): Promise<Array<User>> {
    let promises = [];
    for (let userID of request.users) {
      promises.push(getUserByID(userID));
    }
    const users = await Promise.all(promises);
    return users;
  }
};
export default UserService;
