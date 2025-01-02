import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import FindCustomerUseCase from "./find.customer.usecase";


const customer = new Customer("1", "Customer 1", new Address("Street 1", 1, "12345-678", "City 1"), true);

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("[Unit] Find customer use case", () => {

  it("should find a customer", async () => {
    const input = {
      id: "1",
    };

    const customerRepository = MockRepository();
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

  it("should not find a customer", async () => {
    const customerRepository = MockRepository();

    customerRepository.find.mockImplementation(() => {
      throw new Error("Customer not found");
    });

    const useCase = new FindCustomerUseCase(customerRepository);

    const input = {
      id: "1",
    };

    expect(() => {
      return useCase.execute(input);
    }).rejects.toThrow("Customer not found");

  });
});
