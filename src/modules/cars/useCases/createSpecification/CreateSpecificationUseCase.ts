import { inject, injectable } from "tsyringe";
import { Specification } from "../../entities/Specification";
import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateSpecificationUseCase {
  // eslint-disable-next-line prettier/prettier
  constructor(
    @inject("SpecificationsRepository")
    private specificationsRepository: ISpecificationsRepository) { }

  async execute({ name, description }: IRequest): Promise<Specification> {
    const specificationAlreadyExists =
      await this.specificationsRepository.findByName(name);

    if (specificationAlreadyExists) {
      throw new Error("Specification Already exists!");
      // return response.status(400).json({ error: "Category Already exists!" });
    }

    return await this.specificationsRepository.create({ name, description });
  }
}

export { CreateSpecificationUseCase };
