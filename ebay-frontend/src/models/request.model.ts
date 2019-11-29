export interface BaseRequest {
  url: string;
  body: any;
}

export class GetUserDetailsRequest implements BaseRequest {
  url: string;
  body: any;

  constructor(userID: string) {
    this.url = `/user/${userID}`;
    this.body = null;
  }
}
