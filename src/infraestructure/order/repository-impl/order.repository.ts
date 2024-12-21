import Order from "../../../domain/order/entity/order";
import OrderItemModel from "./order-item.model";
import OrderItem from "../../../domain/order/entity/orderItem";
import OrderRepositoryInterface from "../../../domain/order/repository/order-repository.interface";
import OrderModel from "./order.model";

export default class OrderRepository implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total,
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        include: [{ model: OrderItemModel }],
      }
    );
  }

  async update(entity: Order): Promise<void> {
    const t = await OrderModel.sequelize.transaction();

    try {
      await OrderModel.update(
        {
          customer_id: entity.customerId,
          total: entity.total,
        },
        {
          where: { id: entity.id },
          transaction: t,
        }
      );

      for (const item of entity.items) {
        await OrderItemModel.upsert(
          {
            id: item.id,
            name: item.name,
            price: item.price,
            product_id: item.productId,
            quantity: item.quantity,
            order_id: entity.id,
          },
          {
            transaction: t,
          }
        );
      }

      await t.commit();
    } catch (error) {
      await t.rollback();
      throw error;
    }
  }

  async find(id: string): Promise<Order> {
    const orderModel = await OrderModel.findOne({
      where: { id },
      include: ["items"],
    });

    return new Order(
      orderModel.id,
      orderModel.customer_id,
      orderModel.items.map(
        (item) =>
          new OrderItem(
            item.id,
            item.name,
            item.price,
            item.product_id,
            item.quantity
          )
      )
    );
  }

  async findAll(): Promise<Order[]> {
    const orderModels = await OrderModel.findAll({
      include: ["items"],
    });

    return orderModels.map(
      (orderModel) =>
        new Order(
          orderModel.id,
          orderModel.customer_id,
          orderModel.items.map(
            (item) =>
              new OrderItem(
                item.id,
                item.name,
                item.price,
                item.product_id,
                item.quantity
              )
          )
        )
    );
  }
}
