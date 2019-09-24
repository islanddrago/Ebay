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
  audience: "https://dev-ebay.auth0.com/api/v2/",
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
  // make sure user ID was added to headers
  if (!req.headers.userid) {
    return res.status(400).json({ error: "Missing userID" });
  }
  fetch("https://dev-ebay.auth0.com/oauth/token", {
    body: JSON.stringify({
      audience: "https://dev-ebay.auth0.com/api/v2/",
      client_id: "st0CpfxTU17X25brjvCK2w64pRxvNb2k",
      client_secret: "WgpvbsMATcivi6dFGutCLzlGK1WoFtiwD4HC8cM2s6dJxLdErN3CwBuzgla8QzQ7",
      grant_type: "client_credentials",
    }),
    headers: {
      "Authorization": req.headers.authorization,
      "Content-Type": "application/json",
    },
    method: "POST",
  })
    .then((resp) => resp.json())
    // apply the client access token to the request to be used in future calls
    // pass the token along to the next handler to request user info
    .then((response) => {
      if (!!response.access_token) {
        req.globalToken = response.access_token;
        return req.headers.authorization;
      } else {
        return Promise.reject("Could not get client access_token from Auth0");
      }
    })
    .then((accessToken) => fetch(`https://dev-ebay.auth0.com/api/v2/users/${req.headers.userid}`, {
      headers: {
        Authorization: `${accessToken}`,
      },
      method: "GET",
    }))
    .then((resp) => resp.json())
    .then((response) => {
      if (res.statusCode === 200) {
        req.user = response;
        return next();
      } else {
        return Promise.reject(response);
      }
    })
    .catch((err: any) => {
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
