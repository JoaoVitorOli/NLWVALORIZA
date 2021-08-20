import { getCustomRepository } from "typeorm";

import { CustomError } from "../errors/CustomError";
import { UsersRepositories } from "../repositories/UsersRepositories";

interface IUserRequest {
  name: string,
  email: string,
  admin?: boolean,
  password: string,
}

export class CreateUserService {
  async execute ({ name, email, admin = false, password }: IUserRequest) {
    const usersRepository = getCustomRepository(UsersRepositories);

    if (!email) {
      throw new CustomError(500, "Email incorrect");
    }

    const userAlreadyExists = await usersRepository.findOne({
      email,
    });

    if (userAlreadyExists) {
      throw new CustomError(500, "User already exists");
    }
    
    const user = usersRepository.create({
      name,
      email,
      admin,
      password
    });

    await usersRepository.save(user);

    return user;
  }
}