import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import ListCustomerUseCase from "./list.customer.usecase";

const customerOne = CustomerFactory.createWithAddress("Customer 1", new Address("Street 1", 1, "Zip 1", "City 1"), false);
const customerTwo = CustomerFactory.createWithAddress("Customer 2", new Address("Street 2", 2, "Zip 2", "City 2"), true);

const MockRepository = () => {
  return {
    create: jest.fn(),
    find: jest.fn(),
    update: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve([customerOne, customerTwo])),
  };
};


describe("Unit test for customer listing use case", () => {
  it("should list all customers", async () => {
    const customerRepository = MockRepository();
    const useCase = new ListCustomerUseCase(customerRepository);

    const output = await useCase.execute({});

    expect(output.customers.length).toBe(2);
    expect(output.customers[0].id).toBe(customerOne.id);
    expect(output.customers[0].name).toBe(customerOne.name);
    expect(output.customers[0].address).toEqual(customerOne.address);
    expect(output.customers[1].id).toBe(customerTwo.id);
    expect(output.customers[1].name).toBe(customerTwo.name);
    expect(output.customers[1].address).toEqual(customerTwo.address);
  });
});
