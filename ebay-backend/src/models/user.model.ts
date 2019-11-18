export class User {
  public email: string;
  public email_verified: boolean;
  public name: string;
  public given_name: string;
  public family_name: string;
  public picture: string;
  public locale: string;
  public updated_at: Date;
  public user_id: string;
  public nickname: string;
  public created_at: string;
  public last_ip: string;
  public last_login: string;
  public logins_count: string;

  // custom attributes
  public rsvps: string[];

  constructor(auth0User: any = {}) {
    this.email = auth0User.email;
    this.email_verified = auth0User.email_verified;
    this.name = auth0User.name;
    this.given_name = auth0User.given_name;
    this.family_name = auth0User.family_name;
    this.picture = auth0User.picture;
    this.locale = auth0User.locale;
    this.updated_at = auth0User.updated_at;
    this.user_id = auth0User.user_id;
    this.nickname = auth0User.nickname;
    this.created_at = auth0User.created_at;
    this.last_ip = auth0User.last_ip;
    this.last_login = auth0User.last_login;
    this.logins_count = auth0User.logins_count;

    this.rsvps = new Array<string>();
  }
}
