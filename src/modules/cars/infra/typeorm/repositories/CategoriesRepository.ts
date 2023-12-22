import { Repository, getRepository } from "typeorm";

import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from "@modules/cars/repositories/ICategoriesRepository";
import { Category } from "../entities/Category";

class CategoriesRepository implements ICategoriesRepository {

  //private static INSTANCE: CategoriesRepository;
  private repository: Repository<Category>;

  constructor() {
    this.repository = getRepository(Category);
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<Category> {

    const category = this.repository.create({
      description,
      name
    })

    await this.repository.save(category);

    return category;
  }

  async list(): Promise<Category[]> {

    const categories = await this.repository.find();
    return categories
  }

  async findByName(name: string): Promise<Category> {
    const categoryFound = await this.repository.findOne({ name });
    return categoryFound;

  }
}

export { CategoriesRepository };
