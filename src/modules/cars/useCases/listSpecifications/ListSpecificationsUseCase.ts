import { Specification } from "../../entities/Specification";
import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";

class ListSpecificationsUseCase {
  // eslint-disable-next-line prettier/prettier
  constructor(private specificationsRepository: ISpecificationsRepository) { }

  execute(): Specification[] {
    const specificationsList = this.specificationsRepository.list();
    return specificationsList;
  }
}

export { ListSpecificationsUseCase };
