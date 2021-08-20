import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

import { CustomError } from "../errors/CustomError";

interface IAuthenticateRequest {
  email: string;
  password: string;
}

export class AuthenticateUserService {
  async execute({ email, password }: IAuthenticateRequest) {
    const usersRepositories = getCustomRepository(UsersRepositories);

    const user = usersRepositories.findOne({
      email
    });

    if (!user) {
      throw new CustomError(401, "Email/Password incorrect");
    }

    const passwordMatch = await compare(password, (await user).password);

    if (!passwordMatch) {
      throw new CustomError(401, "Email/Password incorrect");
    }

    const token = sign({
      email: (await user).email
    }, "2bbccd1fe050361111bcc0333d6d9dce", {
      subject: (await user).id,
      expiresIn: "1d"
    });

    return token;
  }
}