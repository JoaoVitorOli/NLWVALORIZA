import { Request, Response } from "express";

import { CreateComplimentService } from "../services/CreateComplimentService";
import { ListTagsService } from "../services/ListTagsService";

export class ListTagsController {
  async handle(request: Request, response: Response) {
    const listTagsService = new ListTagsService();

    const tags = await listTagsService.execute();

    return response.json(tags);
  }
}