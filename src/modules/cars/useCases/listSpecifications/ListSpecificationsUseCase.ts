import { inject, injectable } from "tsyringe";
import { Specification } from "../../entities/Specification";
import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";

@injectable()
class ListSpecificationsUseCase {
  // eslint-disable-next-line prettier/prettier
  constructor(
    @inject("SpecificationsRepository")
    private specificationsRepository: ISpecificationsRepository) { }

  async execute(): Promise<Specification[]> {
    const specificationsList = await this.specificationsRepository.list();
    return specificationsList;
  }
}

export { ListSpecificationsUseCase };
