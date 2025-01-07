import NotificationError from "../../@shared/notification/notification.error";
import Address from "../value-object/address";
import Customer from "./customer";

describe("Customer Unit Tests", () => {
  it("should throw error when ID is empty", () => {
    expect(() => {
      const address = new Address("Street", 123, "Zip", "City");

      new Customer("", "Jhon", address, false);
    }).toThrow("Id is required");
  });

  it("should throw error when Name is empty", () => {
    expect(() => {
      const address = new Address("Street", 123, "Zip", "City");

      new Customer("uuid", "", address, false);
    }).toThrow("customer: Name is required");
  });

  it("should change name", () => {
    const address = new Address("Street", 123, "Zip", "City");
    const customer = new Customer("uuid", "my full name", address, false);

    expect(customer.name).toStrictEqual("my full name");
    customer.changeName("new name");
    expect(customer.name).toStrictEqual("new name");
  });

  it("should throw error when user enter an empty name", () => {
    const address = new Address("Street", 123, "Zip", "City");
    const customer = new Customer("uuid", "my full name", address, false);

    expect(() => {
      customer.changeName("")
    }).toThrow("customer: Name is required");
  });

  it("should activate customer", () => {
    const address = new Address("Street", 123, "Zip", "City");
    const customer = new Customer("uuid", "my full name", address, false);

    customer.activate();

    expect(customer.active).toBe(true);
  });

  it("should deactivate customer", () => {
    const address = new Address("Street", 123, "Zip", "City");
    const customer = new Customer("uuid", "my full name", address, false);

    customer.activate();
    customer.deactivate();

    expect(customer.active).toBe(false);
  });

  it("should add reward points", () => {
    const address = new Address("Street", 123, "Zip", "City");
    const customer = new Customer("uuid", "full name", address, false);
    expect(customer.rewardPoints).toBe(0);

    customer.addRewardPoints(50);
    expect(customer.rewardPoints).toBe(50);

    customer.addRewardPoints(100);
    expect(customer.rewardPoints).toBe(150);
  });
});
