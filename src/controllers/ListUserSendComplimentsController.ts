import { Request, Response } from "express";
import { ListUserSendComplimentService } from "../services/ListUserSendComplimentService";

export class ListUserSendComplimentsController {
  async handle(request: Request, response: Response) {
    const { user_id } = request.body;
    
    const listUserSendComplimentsService = new ListUserSendComplimentService();

    const compliments = await listUserSendComplimentsService.execute(user_id);

    return response.json(compliments);
  }
}