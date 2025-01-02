import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../infraestructure/customer/repository-impl/customer.model";
import CustomerRepository from "../../../infraestructure/customer/repository-impl/customer.repository";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import FindCustomerUseCase from "./find.customer.usecase";

describe("Find customer use case", () => {

  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should find a customer", async () => {
    const input = {
      id: "1",
    };

    const customerRepository = new CustomerRepository();
    const customer = new Customer(input.id, "Customer 1", new Address("Street 1", 1, "12345-678", "City 1"), true);
    await customerRepository.create(customer);
    const useCase = new FindCustomerUseCase(customerRepository);

    const output = {
      id: "1",
      name: "Customer 1",
      address: {
        street: "Street 1",
        number: 1,
        zip: "12345-678",
        city: "City 1",
      },
    };


    const result = await useCase.execute(input);
    
    expect(result).toEqual(output);
  });
});
