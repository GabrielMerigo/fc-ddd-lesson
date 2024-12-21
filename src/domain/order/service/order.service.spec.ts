import Address from "../../customer/value-object/address";
import Customer from "../../customer/entity/customer";
import Order from "../entity/order";
import OrderItem from "../entity/orderItem";
import OrderService from "./order.service";

describe("Order Service Unit Tests", () => {
  it("should place an order", () => {
    const address = new Address("Rua Dois", 123, "91060-530", "Lasar Segall");

    const customer = new Customer("c1", "Customer 1", address, true);
    const item1 = new OrderItem("i1", "item 1", 10, "p1", 1);

    const order = OrderService.placeOrder(customer, [item1]);
    expect(customer.rewardPoints).toBe(5);
    expect(order.total()).toBe(10);
  });

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
