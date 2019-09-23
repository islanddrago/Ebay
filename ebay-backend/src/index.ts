import express, { Request, Response } from "express";
import jwt from "express-jwt";
import jwks from "jwks-rsa";
import fetch from "node-fetch";
import UserController from "./controllers/user/user.controller";

/**
 * index.ts
 * entry point for Express server
 *
 * tutorials followed to set up:
 * https://developer.okta.com/blog/2018/11/15/node-express-typescript
 * https://medium.com/the-andela-way/structuring-an-express-js-api-fc62efa038c5
 */

const app = express();
const port = process.env.PORT || 6969;
const jwtCheck = jwt({
  algorithms: ["RS256"],
  audience: "https://ebay/api",
  issuer: "https://dev-ebay.auth0.com/",
  secret: jwks.expressJwtSecret({
    cache: true,
    jwksRequestsPerMinute: 10,
    jwksUri: "https://dev-ebay.auth0.com/.well-known/jwks.json",
    rateLimit: true,
  }),
});

/**
 * authenticate - middleware
 * configure middleware to check for a token and apply user data to the request object
 */
function authenticate(req: Request, res: Response, next: any) {
  console.log("token: ", `Bearer ${req.headers.token}`);
  fetch(`https://dev-ebay.auth0.com/api/v2/users/auth0%7C5d870ad261cc980deca26591`, {
    headers: {
      Authorization: `Bearer ${req.headers.token}`,
    },
  })
    .then((resp) => resp.json())
    .then((response) => {
      console.log("response: ", response);
      // if (response.status === 200) {
      //   req.user = response.body;
      // }
      // return next();
    }).catch((err: any) => {
      res.status(400).json({ err });
    });
}

// middleware
app.use(jwtCheck);
app.use(authenticate);

// use controllers to manage different endpoints
app.use("/user", UserController);

// start the server
app.listen(port, () => console.log(`Server started on port ${port}`));
