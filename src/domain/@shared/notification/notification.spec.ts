import { Notification } from "./notification";

describe("Unit test for notification", () => {

  it("should create errors", () => {
    const notification = new Notification();
    const error = new Error("error message");
    const errorTwo = new Error("error message two");

    notification.addError({
      message: error.message,
      context: "customer",
    }); 

    expect(notification.messages("customer")).toBe("customer: error message, ");

    notification.addError({
      message: errorTwo.message,
      context: "customer",
    }); 

    expect(notification.messages("customer")).toBe("customer: error message, customer: error message two, ");
    expect(notification.messages()).toBe("customer: error message, customer: error message two, ");
  });

  it("should check if has errors", () => {
    const notification = new Notification();
    expect(notification.hasErrors()).toBe(false);

    notification.addError({
      message: "error message",
      context: "customer",
    });

    expect(notification.hasErrors()).toBe(true);
  });

  it("should get all errors props", () => {
    const notification = new Notification();
    const error = new Error("error message");
    const errorTwo = new Error("error message two");
    notification.addError({ message: error.message, context: "customer" });
    notification.addError({ message: errorTwo.message, context: "customer" });

    expect(notification.getErrors()).toEqual([{ message: error.message, context: "customer" }, { message: errorTwo.message, context: "customer" }]);
  });

});
