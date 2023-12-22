import { inject, injectable } from "tsyringe";
import { CategoriesRepository } from "../../infra/typeorm/repositories/CategoriesRepository";
import { Category } from "../../infra/typeorm/entities/Category";
import { AppError } from "@shared/errors/AppError";

@injectable()
class GetCategoryByNameUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoryRepository: CategoriesRepository
  ) { }
  async execute(name: string): Promise<Category> {
    const category = await this.categoryRepository.findByName(name);

    if (!category) {
      throw new AppError("Category does not exist");
    }

    return category;
  }
}

export { GetCategoryByNameUseCase }