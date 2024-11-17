import Order from "../entity/order";
import OrderItem from "../entity/orderItem";
import OrderService from "./order.service";

describe("Order Service Unit Tests", () => {
  it("should get total of all orders", () => {
    const orderItem = new OrderItem(
      "uuid-i1",
      "Name of the Item 1",
      100,
      "Product-uuid",
      1
    );

    const orderItem2 = new OrderItem(
      "uuid-i2",
      "Name of the Item 2",
      200,
      "Product-uuid",
      2
    );

    const order = new Order("o1", "c1", [orderItem]);
    const order2 = new Order("o2", "c1", [orderItem2]);

    const total = OrderService.total([order, order2]);

    expect(total).toBe(500);
  });
});
