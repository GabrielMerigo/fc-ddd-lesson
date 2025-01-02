import Address from "../../../domain/customer/value-object/address";
import { CreateCustomerUseCase } from "./create.customer.usecase";

const input = {
  name: "John Doe",
  address: {
    street: "123 Main St",
    number: 123,
    zip: "12345",
    city: "Anytown",
  },
};


const MockRepository = () => {
  return {
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn(),
    findAll: jest.fn(),
  };
};

describe("Unit test create customer use case", () => {
  it("should create a customer", async () => {
    const customerRepository = MockRepository();
    const useCase = new CreateCustomerUseCase(customerRepository);

    const output = await useCase.execute(input);

    const outputExpected = {
      id: expect.any(String),
      name: input.name,
      address: new Address(input.address.street, input.address.number, input.address.zip, input.address.city),
    };

    expect(output).toEqual(outputExpected);
  });

  it("should throw an error when name is missing", async () => {
    const customerRepository = MockRepository();
    const useCase = new CreateCustomerUseCase(customerRepository);

    expect(useCase.execute({ name: "", address: input.address  })).rejects.toThrow("Name is required");
  });
    
  it("should throw an error when address is missing", async () => {
    const customerRepository = MockRepository();
    const useCase = new CreateCustomerUseCase(customerRepository);

    expect(useCase.execute({ name: "", address: undefined  })).rejects.toThrow("Cannot read properties of undefined (reading 'street')");
  });
});
