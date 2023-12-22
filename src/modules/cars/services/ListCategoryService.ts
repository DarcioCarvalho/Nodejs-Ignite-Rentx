import { Category } from "../infra/typeorm/entities/Category";
import { ICategoriesRepository } from "../repositories/ICategoriesRepository";

class ListCategoryService {
  // eslint-disable-next-line prettier/prettier
  constructor(private categoriesRepository: ICategoriesRepository) { }

  async execute(): Promise<Category[]> {
    return this.categoriesRepository.list();
  }
}

export { ListCategoryService };
