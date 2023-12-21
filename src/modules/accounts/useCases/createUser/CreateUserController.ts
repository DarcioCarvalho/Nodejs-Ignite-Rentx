import { Request, Response } from "express";
import { CreateUserUseCase } from "./CreateUserUseCase";
import { container } from "tsyringe";

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, password, email, driver_license } = request.body;

    try {
      const createUserUseCase = container.resolve(CreateUserUseCase);
      const user = await createUserUseCase.execute({
        name, password, email, driver_license
      });
      return response.status(201).json(user);

    } catch (error) {
      return response.status(400).json({ error: error.message })
    }

  }
}

export { CreateUserController }