import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayoad {
  sub: string;
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    return response.status(401).end();
  }

  const [, token] = authToken.split(" ");

  try {
    const { sub }= verify(token, "2bbccd1fe050361111bcc0333d6d9dce") as IPayoad;

    request.user_id = sub;

    return next();
  } catch (err) {
    return response.status(401).end();
  }
}
