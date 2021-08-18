import { getCustomRepository } from "typeorm";

import { CustomError } from "../errors/CustomError";
import { TagsRepositories } from "../repositories/TagsRepositories";

export class CreateTagService {
  async execute(name: string) {
    const tagsRepositories = getCustomRepository(TagsRepositories);

    if (!name) {
      throw new CustomError(404, "Incorrect name");
    }

    const tagAlradyExists = await tagsRepositories.findOne({
      name,
    });

    if (tagAlradyExists) {
      throw new CustomError(500, "Tag already exists.");
    }

    const tag = tagsRepositories.create({
      name
    });

    await tagsRepositories.save(tag);

    return tag;
  }
}