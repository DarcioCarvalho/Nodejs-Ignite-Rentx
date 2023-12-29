import dayjs from "dayjs";

import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { CreateRentalUseCase } from "./CreateRentalUseCase";
import { AppError } from "@shared/errors/AppError";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementions/DayjsDateProvider";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;

describe("Create Rental", () => {
  let dayAdd24hour: Date;
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory, dayjsDateProvider);

    dayAdd24hour = dayjsDateProvider.addInDays(1);
  })

  it("should be able to create a new rental", async () => {

    const rental = await createRentalUseCase.execute({
      user_id: "12345",
      car_id: "121212",
      expected_return_date: dayAdd24hour
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("should not be able to create a new rental if there is another open with same user", async () => {

    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "12345",
        car_id: "121212",
        expected_return_date: dayAdd24hour
      });

      await createRentalUseCase.execute({
        user_id: "12345",
        car_id: "898989",
        expected_return_date: dayAdd24hour
      });
    }).rejects.toBeInstanceOf(AppError);

  });

  it("should not be able to create a new rental if there is another open with same car", async () => {

    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "12345",
        car_id: "test",
        expected_return_date: dayAdd24hour
      });

      await createRentalUseCase.execute({
        user_id: "67253",
        car_id: "test",
        expected_return_date: dayAdd24hour
      });
    }).rejects.toBeInstanceOf(AppError);

  });

  it("should not be able to create a new rental with invalid return time", async () => {

    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "12345",
        car_id: "test",
        expected_return_date: new Date()
      });

    }).rejects.toBeInstanceOf(AppError);

  });

});