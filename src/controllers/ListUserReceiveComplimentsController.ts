import { Request, Response } from "express";
import { ListUserReceiveComplimentService } from "../services/ListUserReceiveCompimentsService";

export class ListUserReceiveComplimentsController {
  async handle(request: Request, response: Response) {
    const { user_id } = request.body;
    
    const listUserReceiveComplimentsService = new ListUserReceiveComplimentService();

    const compliments = await listUserReceiveComplimentsService.execute(user_id);

    return response.json(compliments);
  }
}