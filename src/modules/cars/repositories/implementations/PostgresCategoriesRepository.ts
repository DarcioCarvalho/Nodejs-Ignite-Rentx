import { Category } from "../../entities/Category";
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from "../ICategoriesRepository";

class PostgresCategoriesRepository implements ICategoriesRepository {
  findByName(name: string): Category {
    console.log(name);
    return null;
    // throw new Error("Method not implemented.");
  }
  list(): Category[] {
    const categories: Category[] = [];
    categories.push({
      name: "Lista do Postgres Fake",
      description: "Testando o ICategoriesRepository",
      created_at: new Date(),
    });

    return categories;
    // throw new Error("Method not implemented.");
  }
  create({ name, description }: ICreateCategoryDTO): Category {
    console.log({ name, description });
    return null;
    // throw new Error("Method not implemented.");
  }
}

export { PostgresCategoriesRepository };
