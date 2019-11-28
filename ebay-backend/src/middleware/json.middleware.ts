import { Request, Response } from "express";

const dateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;

export function reviveBody(req: Request, _: Response, next: any) {
  if (!req.body) {
    return next();
  }
  const keys = Object.keys(req.body);
  for (const key of keys) {
    const value = req.body[key];
    if (typeof value === "string" && dateFormat.test(value)) {
      req.body[key] = new Date(value);
    }
  }
  console.log("request body: ", JSON.stringify(req.body));
  return next();
}
