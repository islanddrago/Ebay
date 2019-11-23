import { Request, Response } from "express";
import jwt from "express-jwt";
import jwks from "jwks-rsa";
import fetch from "node-fetch";
import { createUser, getUserByID } from "../db/user.db";
import { User } from "../models/user.model";

export const jwtCheck = jwt({
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
export function authenticate(req: Request, res: Response, next: any) {
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
    // fetch the user from auth0
    .then((accessToken) => fetch(`https://dev-ebay.auth0.com/api/v2/users/${req.headers.userid}`, {
      headers: {
        Authorization: `${accessToken}`,
      },
      method: "GET",
    }))
    .then((resp) => {
      if (resp.status !== 200) {
        return Promise.reject(resp);
      }
      return resp.json();
    })
    .then(async (user) => await createUserData(user))
    .then((response) => {
      req.user = response;
      return next();
    })
    .catch((err: any) => {
      res.status(400).json({
        error: {
          error: err.error,
          errorCode: err.errorCode,
          message: err.message,
          statusCode: err.statusCode,
        },
      });
    });
}

async function createUserData(auth0User: any) {
  const newUser = new User(auth0User);
  try {
    const checkUser = await getUserByID(newUser.user_id);
    if (!checkUser) {
      const createdUser = await createUser(newUser);
      return createdUser;
    }
    return { ...checkUser, ...auth0User };
  } catch (e) {
    return auth0User;
  }
}
