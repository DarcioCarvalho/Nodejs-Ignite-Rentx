import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetCategoryByNameUseCase } from "./GetCategoryByNameUseCase";


class GetCategoryByNameController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name } = request.params;

    const getCategoryByNameUseCase = container.resolve(GetCategoryByNameUseCase);
    try {
      const category = await getCategoryByNameUseCase.execute(name);
      return response.json(category);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }

  }
}

export { GetCategoryByNameController }