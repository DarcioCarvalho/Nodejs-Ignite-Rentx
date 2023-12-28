import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { AppError } from "@shared/errors/AppError";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { inject, injectable } from "tsyringe";


interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}

@injectable()
class CreateRentalUseCase {

  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,

    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,
  ) { }
  async execute({ user_id, car_id, expected_return_date }: IRequest): Promise<Rental> {

    const minimumHour = 24;

    // Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro.
    const rentalOpenToCar = await this.rentalsRepository.findOpenRentalByCar(car_id);

    if (rentalOpenToCar) {
      throw new AppError("Car is unavailable!!!")
    }

    // Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário.
    const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(user_id);

    if (rentalOpenToUser) {
      throw new AppError("There's a rental in progress for use")
    }

    // O aluguel deve ter duração mínima de 24 horas.
    const dateNow = this.dateProvider.dateNow();

    const compare = this.dateProvider.compareInHours(dateNow, expected_return_date);

    if (compare < minimumHour) {
      throw new AppError("Invalid return time!");
    }


    const rental = await this.rentalsRepository.create({
      user_id,
      car_id,
      expected_return_date
    });

    console.log("Rental: ", rental);

    return rental;

  }
}

export { CreateRentalUseCase }