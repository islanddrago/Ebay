declare namespace Express {
  export interface Request {
    user?: any;
    globalToken?: string;
  }
}
