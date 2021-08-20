import { Request, Response } from "express";
import { CreateUserService } from "../services/CreateUserService";
import { hash } from "bcryptjs";

export class CreateUserController {
  async handle(request: Request, response: Response) {
    const {
      name,
      email,
      admin,
      password
    } = request.body;

    const createUserService = new CreateUserService();

    const passwordHash = await hash(password, 8);

    const user = await createUserService.execute({
      name,
      email,
      admin,
      password: passwordHash
    });

    return response.json(user);
  }
}