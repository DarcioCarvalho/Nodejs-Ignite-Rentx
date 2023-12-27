import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";
import { AppError } from "@shared/errors/AppError";
import { SpecificationsRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationsRepositoryInMermory";

let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;
let createCarSpecificationUseCase: CreateCarSpecificationUseCase;

describe("Create Car Specification", () => {

  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory, specificationsRepositoryInMemory);
  });

  it("should not be able to add new specification to the car", async () => {

    expect(async () => {
      const car_id = "123";
      const specifications_id = ["54321"];

      await createCarSpecificationUseCase.execute({ car_id, specifications_id });
    }).rejects.toBeInstanceOf(AppError);

  });

  it("should not be able to add new specification to the car", async () => {

    const car = await carsRepositoryInMemory.create({
      name: "Name Car",
      description: "Description Car",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Brand Car",
      category_id: "Category"
    });

    const specification = await specificationsRepositoryInMemory.create({
      name: "Name Specification",
      description: "Description Specification"
    });

    const specifications_id = [specification.id];

    const carsSpecifications = await createCarSpecificationUseCase.execute({ car_id: car.id, specifications_id });

    console.log("Car with specifications: ", car);
    console.log("Cars_Specifications:", carsSpecifications);

    expect(car).toHaveProperty("specifications");
    expect(car.name).toEqual("Name Car");
    expect(car.specifications[0].name).toEqual("Name Specification");

    expect(carsSpecifications).toHaveProperty("specifications");
    expect(carsSpecifications.specifications.length).toBe(1);

  });

});