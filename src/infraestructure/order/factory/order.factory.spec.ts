import { v4 as uuid } from "uuid";
import OrderFactory from "./order.factory";

describe("order factory unit test", () => {
  it("should create a order", () => {
    const orderProps = {
      id: uuid(),
      customerId: uuid(),
      items: [
        {
          id: uuid(),
          name: "Product A",
          price: 100,
          productId: uuid(),
          quantity: 1,
        },
      ],
    };

    const order = OrderFactory.create(orderProps);

    expect(order).toBeDefined();
    expect(order.id).toBe(orderProps.id);
    expect(order.customerId).toBe(orderProps.customerId);
    expect(order.items.length).toBe(orderProps.items.length);
  });
});
