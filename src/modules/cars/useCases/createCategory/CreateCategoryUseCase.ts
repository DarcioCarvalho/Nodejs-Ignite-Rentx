import { inject, injectable } from "tsyringe";
import { Category } from "../../entities/Category";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";
import { AppError } from "../../../../errors/AppError";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateCategoryUseCase {
  // eslint-disable-next-line prettier/prettier
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository) { }

  async execute({ name, description }: IRequest): Promise<Category> {
    const categoryAlreadyExists = await this.categoriesRepository.findByName(name);

    if (categoryAlreadyExists) {
      throw new AppError("Category Already exists!");
      //return response.status(400).json({ error: "Category Already exists!" });
    }

    return await this.categoriesRepository.create({ name, description });
  }
}

export { CreateCategoryUseCase };
