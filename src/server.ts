import "reflect-metadata";
import "express-async-errors";
import express, { 
  NextFunction,
  Request,
  Response 
} from "express";

import { router } from "./routes";

import "./database";

import { CustomError } from "./errors/CustomError";

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(router);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if (err instanceof CustomError) {
    return response.status(err.statusCode).json({
      error: err.message
    });
  }

  return response.status(500).json({
    status: "error",
    message: "Internal Server Error"
  });
});

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});