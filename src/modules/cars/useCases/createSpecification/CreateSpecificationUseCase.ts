import { Specification } from "../../entities/Specification";
import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";

interface IRequest {
  name: string;
  description: string;
}

class CreateSpecificationUseCase {
  // eslint-disable-next-line prettier/prettier
  constructor(private specificationsRepository: ISpecificationsRepository) { }

  execute({ name, description }: IRequest): Specification {
    const specificationAlreadyExists =
      this.specificationsRepository.findByName(name);

    if (specificationAlreadyExists) {
      throw new Error("Specification Already exists!");
      // return response.status(400).json({ error: "Category Already exists!" });
    }

    return this.specificationsRepository.create({ name, description });
  }
}

export { CreateSpecificationUseCase };
