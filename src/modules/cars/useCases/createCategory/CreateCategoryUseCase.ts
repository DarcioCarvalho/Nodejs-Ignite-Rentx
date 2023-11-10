import { Category } from "../../entities/Category";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IRequest {
  name: string;
  description: string;
}

class CreateCategoryUseCase {
  // eslint-disable-next-line prettier/prettier
  constructor(private categoriesRepository: ICategoriesRepository) { }

  async execute({ name, description }: IRequest): Promise<Category> {
    const categoryAlreadyExists = await this.categoriesRepository.findByName(name);

    if (categoryAlreadyExists) {
      throw new Error("Category Already exists!");
      // return response.status(400).json({ error: "Category Already exists!" });
    }

    return await this.categoriesRepository.create({ name, description });
  }
}

export { CreateCategoryUseCase };
