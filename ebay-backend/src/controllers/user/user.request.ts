/**
 * user.request.ts
 * contains defintions for user request models
 */

export class UpdateUserRequest {
  public email: string;
  public name: string;
  public given_name: string;
  public family_name: string;
  public picture: string;
  public nickname: string;
}
