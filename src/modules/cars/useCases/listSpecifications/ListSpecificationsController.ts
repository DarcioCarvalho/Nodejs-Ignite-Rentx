import { Request, Response } from "express";

import { ListSpecificationsUseCase } from "./ListSpecificationsUseCase";

class ListSpecificationsController {
  // eslint-disable-next-line prettier/prettier
  constructor(private listSpecificationsUseCase: ListSpecificationsUseCase) { }

  handle(request: Request, response: Response) {
    return response.json(this.listSpecificationsUseCase.execute());
  }
}

export { ListSpecificationsController };
