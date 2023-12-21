import { Request, Response } from "express";

import { CreateCategoryUseCase } from "./CreateCategoryUseCase";
import { container } from "tsyringe";

class CreateCategoryController {
  // eslint-disable-next-line prettier/prettier

  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;

    const createCategoryUseCase = container.resolve(CreateCategoryUseCase);

    try {
      const category = await createCategoryUseCase.execute({ name, description });
      return response.status(201).json(category);
    } catch (error) {
      return response.status(400).json({ error: error.message })
    }



  }
}

export { CreateCategoryController };
