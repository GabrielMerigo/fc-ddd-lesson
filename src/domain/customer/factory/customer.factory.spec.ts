import Address from "../../../domain/customer/value-object/address";
import CustomerFactory from "./customer.factory";

describe("Customer factory unit test", () => {
  it("should create a customer with address", () => {
    const customer = CustomerFactory.createWithAddress(
      "Customer A",
      new Address("Street", 1, "Zip", "City"),
    );

    expect(customer).toBeDefined();
    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("Customer A");
    expect(customer.constructor.name).toBe("Customer");
  });
});
