import { Category } from "../entities/Category";
import { ICategoriesRepository } from "../repositories/ICategoriesRepository";

class ListCategoryService {
  // eslint-disable-next-line prettier/prettier
  constructor(private categoriesRepository: ICategoriesRepository) { }

  execute(): Category[] {
    return this.categoriesRepository.list();
  }
}

export { ListCategoryService };
