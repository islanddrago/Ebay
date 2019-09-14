import BaseResponse from "../base.response";

/**
 * user.response.ts
 * contains defintions for user response models
 */

export class LoginResponse implements BaseResponse {
  public errors: string[] = [];
  public messages: string[] = [];
  public body: any = {};

  constructor(token?: string) {
    this.body = {
      token,
    };
  }
}
