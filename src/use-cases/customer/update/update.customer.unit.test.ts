import Address from "../../../domain/customer/value-object/address";
import CustomerFactory from "../../../infraestructure/customer/factory/customer.factory";
import UpdateCustomerUseCase from "./update.customer.usecase";

const customer = CustomerFactory.createWithAddress(
  "John",
  new Address("Street", 1, "Zip", "City")
);

const input = {
  id: customer.id,
  name: "John Updated",
  address: new Address("Street Updated", 2, "Zip Updated", "City Updated"),
};

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    update: jest.fn(),
    create: jest.fn(),
    findAll: jest.fn(),
  };
};

describe("Unit test for customer update use case", () => {
  it("should update a customer", async () => {
    const customerRepository = MockRepository();
    const useCase = new UpdateCustomerUseCase(customerRepository);

    const output = await useCase.execute(input);

    expect(output).toEqual(input);
  });
});
