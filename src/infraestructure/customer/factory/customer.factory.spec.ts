import Address from "../../../domain/customer/value-object/address";
import CustomerFactory from "./customer.factory";

describe("Customer factory unit test", () => {
  it("should create a customer type A", () => {
    const customer = CustomerFactory.create(
      "A",
      "Customer A",
      new Address("Street", 1, "Zip", "City"),
      false
    );

    expect(customer).toBeDefined();
    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("Customer A");
    expect(customer.constructor.name).toBe("Customer");
  });

  it("should throw an error when creating a customer with an invalid type", () => {
    expect(() =>
      CustomerFactory.create(
        "C",
        "Customer C",
        new Address("Street", 1, "Zip", "City"),
        false
      )
    ).toThrow("Invalid customer type");
  });
});
