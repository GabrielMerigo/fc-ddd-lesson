import { DataTypes, Sequelize } from "sequelize";
import OrderRepository from "./order.repository";
import Order from "../../../domain/checkout/entity/order";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import ProductModel from "../../product/repository-impl/product.model";
import CustomerModel from "../../customer/repository-impl/customer.model";
import Product from "../../../domain/product/entity/product";
import ProductRepository from "../../product/repository-impl/product.repository";
import OrderItem from "../../../domain/checkout/entity/orderItem";
import CustomerRepository from "../../customer/repository-impl/customer.repository";
import OrderItemModel from "./order-item.model";
import OrderModel from "./order.model";

describe("Customer Repository Test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    ProductModel.initialize(
      {
        id: {
          type: DataTypes.STRING,
          allowNull: false,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        price: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "Products",
        timestamps: false,
      }
    );

    CustomerModel.initialize(
      {
        id: {
          type: DataTypes.STRING,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        street: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        number: {
          type: DataTypes.NUMBER,
          allowNull: false,
        },
        zipCode: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        city: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        active: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "Customers",
        timestamps: false,
      }
    );

    OrderModel.initialize(
      {
        id: {
          type: DataTypes.STRING,
          primaryKey: true,
        },
        customer_id: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        total: {
          type: DataTypes.NUMBER,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "Orders",
        timestamps: false,
      }
    );

    OrderItemModel.initialize(
      {
        id: {
          type: DataTypes.STRING,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        price: {
          type: DataTypes.NUMBER,
          allowNull: false,
        },
        product_id: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        quantity: {
          type: DataTypes.NUMBER,
          allowNull: false,
        },
        order_id: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "OrderItems",
        timestamps: false,
      }
    );

    OrderModel.hasMany(OrderItemModel, {
      foreignKey: "order_id",
      as: "items",
    });
    OrderItemModel.belongsTo(OrderModel, { foreignKey: "order_id" });

    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a new order", async () => {
    const customerRepository = new CustomerRepository();
    const orderRepository = new OrderRepository();
    const productRepository = new ProductRepository();

    const customer = new Customer(
      "1",
      "Customer 1",
      new Address("Street 1", 1, "123423", "City 1"),
      false
    );

    await customerRepository.create(customer);

    const product = new Product("p1", "Item 1", 100);
    await productRepository.create(product);

    const item = new OrderItem("1", product.name, product.price, product.id, 2);
    const order = new Order("1", customer.id, [item]);

    await orderRepository.create(order);
    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    expect(orderModel.toJSON()).toStrictEqual(
      expect.objectContaining({
        id: "1",
        customer_id: customer.id,
        items: [
          {
            id: item.id,
            name: item.name,
            price: item.price,
            product_id: item.productId,
            quantity: item.quantity,
            order_id: order.id,
          },
        ],
      })
    );
  });

  it("should update an order", async () => {
    const customerRepository = new CustomerRepository();
    const orderRepository = new OrderRepository();
    const productRepository = new ProductRepository();

    const customer = new Customer(
      "1",
      "Customer 1",
      new Address("Street 1", 1, "123423", "City 1"),
      false
    );
    await customerRepository.create(customer);

    const product = new Product("p1", "Item 1", 100);
    await productRepository.create(product);

    const item = new OrderItem("1", product.name, product.price, product.id, 2);
    const order = new Order("1", customer.id, [item]);
    await orderRepository.create(order);

    const updatedItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      5
    );
    const updatedOrder = new Order("1", customer.id, [updatedItem]);
    await orderRepository.update(updatedOrder);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    expect(orderModel.toJSON()).toStrictEqual(
      expect.objectContaining({
        id: "1",
        customer_id: customer.id,
        items: [
          {
            id: updatedItem.id,
            name: updatedItem.name,
            price: updatedItem.price,
            product_id: updatedItem.productId,
            quantity: updatedItem.quantity,
            order_id: order.id,
          },
        ],
      })
    );
  });

  it("should find an order", async () => {
    const customerRepository = new CustomerRepository();
    const orderRepository = new OrderRepository();
    const productRepository = new ProductRepository();

    const customer = new Customer(
      "1",
      "Customer 1",
      new Address("Street 1", 1, "123423", "City 1"),
      false
    );
    await customerRepository.create(customer);

    const product = new Product("p1", "Item 1", 100);
    await productRepository.create(product);

    const item = new OrderItem("1", product.name, product.price, product.id, 2);
    const order = new Order("1", customer.id, [item]);
    await orderRepository.create(order);

    const foundOrder = await orderRepository.find("1");

    expect(foundOrder).toStrictEqual(order);
  });

  it("should find all orders", async () => {
    const customerRepository = new CustomerRepository();
    const orderRepository = new OrderRepository();
    const productRepository = new ProductRepository();

    const customer = new Customer(
      "1",
      "Customer 1",
      new Address("Street 1", 1, "123423", "City 1"),
      false
    );
    await customerRepository.create(customer);

    const product = new Product("p1", "Item 1", 100);
    await productRepository.create(product);

    const item1 = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );
    const item2 = new OrderItem(
      "2",
      product.name,
      product.price,
      product.id,
      3
    );

    const order1 = new Order("1", customer.id, [item1]);
    const order2 = new Order("2", customer.id, [item2]);

    await orderRepository.create(order1);
    await orderRepository.create(order2);

    const orders = await orderRepository.findAll();

    expect(orders).toHaveLength(2);
    expect(orders).toContainEqual(order1);
    expect(orders).toContainEqual(order2);
  });
});
