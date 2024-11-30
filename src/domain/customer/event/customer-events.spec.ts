import { EventDispatcherSingleton } from "../../@shared/event/event-dispatcher-singleton";
import SendConsoleLogOneHandler from "./handler/send-console-log-one-handler";
import SendConsoleLogSecondHandler from "./handler/send-console-log-second-handler";
import SendConsoleWhenUserChangeAddress from "./handler/send-console-when-user-change-address";
import Customer from "../entity/customer";
import Address from "../value-object/address";

describe("Customer Events Tests", () => {
  beforeEach(() => {
    const eventDispatcher = EventDispatcherSingleton.getInstance();
    eventDispatcher.unregisterAll();
  });

  it("should notify an event when a customer is created", async () => {
    const eventDispatcher = EventDispatcherSingleton.getInstance();
    const spyEventHandler1 = jest.spyOn(console, "log");

    eventDispatcher.register(
      "CustomerCreatedEvent",
      new SendConsoleLogOneHandler()
    );
    eventDispatcher.register(
      "CustomerCreatedEvent",
      new SendConsoleLogSecondHandler()
    );

    const address = new Address("Street 1", 123, "12345", "City");
    new Customer("123", "John Doe", address, false);

    expect(spyEventHandler1).toHaveBeenCalledTimes(2);
    expect(spyEventHandler1).toHaveBeenCalledWith(
      "This is the first console log of the event CustomerCreated"
    );
    expect(spyEventHandler1).toHaveBeenCalledWith(
      "This is the second console log of the event CustomerCreated"
    );
  });

  it("should notify an event when a customer address is changed", async () => {
    const eventDispatcher = EventDispatcherSingleton.getInstance();
    const spyEventHandler1 = jest.spyOn(console, "log");

    eventDispatcher.register(
      "CustomerChangeAddressEvent",
      new SendConsoleWhenUserChangeAddress()
    );

    const address = new Address("Street 1", 123, "12345", "City");
    const customer = new Customer("123", "John Doe", address, false);
    customer.changeAddress(new Address("Street 2", 456, "67890", "Other City"));

    expect(spyEventHandler1).toHaveBeenCalledTimes(1);
    expect(spyEventHandler1).toHaveBeenCalledWith(
      `The customer ${customer.id}, ${customer.name} changed address to ${customer.address.street}`
    );
  });
});
