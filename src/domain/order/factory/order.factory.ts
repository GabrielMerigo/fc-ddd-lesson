import Order from "../../../domain/order/entity/order";
import OrderItem from "../../../domain/order/entity/orderItem";

interface OrderFactoryProps {
  id: string;
  customerId: string;
  items: {
    id: string;
    name: string;
    price: number;
    productId: string;
    quantity: number;
  }[];
}

export default class OrderFactory {
  static create(orderProps: OrderFactoryProps): Order {
    return new Order(
      orderProps.id,
      orderProps.customerId,
      orderProps.items.map(
        (item) =>
          new OrderItem(
            item.id,
            item.name,
            item.price,
            item.productId,
            item.quantity
          )
      )
    );
  }
}
