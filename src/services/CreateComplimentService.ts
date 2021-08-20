import { getCustomRepository } from "typeorm";
import { CustomError } from "../errors/CustomError";

import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories";
import { UsersRepositories } from "../repositories/UsersRepositories";

interface IComplimentRequest {
  tag_id: string;
  user_sender: string;
  user_receiver: string;
  message: string;
}

export class CreateComplimentService {
  async execute({ message, tag_id, user_receiver, user_sender }: IComplimentRequest) {
    const complimentsRepositories = getCustomRepository(ComplimentsRepositories);
    const usersRepositories = getCustomRepository(UsersRepositories);

    if (user_sender === user_receiver) {
      throw new CustomError(401, "incorrect User Receiver");
    }

    const userReceiverExists = await usersRepositories.findOne(user_receiver);

    if (!userReceiverExists) {
      throw new CustomError(404, "User Receiver does not exists.");
    }

    const compliment = complimentsRepositories.create({
      tag_id,
      user_sender,
      user_receiver,
      message,
    });

    await complimentsRepositories.save(compliment);

    return compliment;
  }
}