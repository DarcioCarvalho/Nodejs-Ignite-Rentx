import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let carsRepositoryInMemory: CarsRepositoryInMemory;
let listAvailableCarsUseCase: ListAvailableCarsUseCase;

describe("List Cars", () => {

  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
  })

  it("should be able to list all available cars", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car1",
      description: "Car description",
      daily_rate: 190,
      license_plate: "DNC-7777",
      fine_amount: 120,
      brand: "Brand",
      category_id: "category_id"
    });

    const cars = await listAvailableCarsUseCase.execute();

    expect(cars).toEqual([car]);

  });

  it("should be able to list all available cars by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car1",
      description: "Car description",
      daily_rate: 190,
      license_plate: "DNC-7777",
      fine_amount: 120,
      brand: "car_brand_test",
      category_id: "category_id"
    });

    const cars = await listAvailableCarsUseCase.execute({ brand: "car_brand_test" });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car2",
      description: "Car description",
      daily_rate: 190,
      license_plate: "DNC-9876",
      fine_amount: 120,
      brand: "Brand",
      category_id: "category_id"
    });

    const cars = await listAvailableCarsUseCase.execute({ name: "Car2" });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by category", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car3",
      description: "Car description",
      daily_rate: 190,
      license_plate: "DNC-9876",
      fine_amount: 120,
      brand: "Brand",
      category_id: "category_id_test"
    });

    const cars = await listAvailableCarsUseCase.execute({ category_id: "category_id_test" });

    expect(cars).toEqual([car]);
  });

});