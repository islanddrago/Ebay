import cors from "cors";
import express from "express";

import { authenticate, jwtCheck } from "./middleware/authentication.middleware";
import { reviveBody } from "./middleware/json.middleware";

import EventController from "./controllers/event/event.controller";
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

// middleware
app.use(express.json());
app.use(cors());
app.use(reviveBody);

// use controllers to manage different endpoints
app.use("/user", UserController);
app.use("/event", EventController);

// start the server
app.listen(port, () => console.log(`Server started on port ${port}`));
