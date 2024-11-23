import { DataTypes, Sequelize } from "sequelize";
import CustomerModel from "../db/sequelize/model/customer.model";
import Customer from "../../domain/entity/customer";
import CustomerRepository from "./customer.repository";
import Address from "../../domain/entity/address";

describe("Customer Repository Test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
    });

    CustomerModel.initialize(
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
        street: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        number: {
          type: DataTypes.INTEGER,
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
        rewardPoints: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "Customer",
      }
    );
    await sequelize.sync({ force: true });
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a customer", async () => {
    const customerRepository = new CustomerRepository();
    const address = new Address("Street 1", 123, "12345", "City");
    const customer = new Customer("uuid", "John Doe", address, false);

    await customerRepository.create(customer);

    const customerModel = await CustomerModel.findOne({
      where: { id: "uuid" },
    });

    expect(customerModel.toJSON()).toStrictEqual(
      expect.objectContaining({
        id: "uuid",
        name: "John Doe",
        street: "Street 1",
        number: 123,
        zipCode: "12345",
        city: "City",
        active: false,
        rewardPoints: 0,
      })
    );
  });

  it("should update a customer", async () => {
    const customerRepository = new CustomerRepository();
    const address = new Address("Street 1", 123, "12345", "City");
    const customer = new Customer("uuid", "John Doe", address, false);

    await customerRepository.create(customer);

    customer.changeName("Jane Doe");
    await customerRepository.update(customer);

    const customerModel = await CustomerModel.findOne({
      where: { id: "uuid" },
    });
    expect(customerModel.toJSON()).toStrictEqual(
      expect.objectContaining({
        id: "uuid",
        name: "Jane Doe",
        street: "Street 1",
        number: 123,
        zipCode: "12345",
        city: "City",
        active: false,
        rewardPoints: 0,
      })
    );
  });

  it("should find a customer", async () => {
    const customerRepository = new CustomerRepository();
    const address = new Address("Street 1", 123, "12345", "City");
    const customer = new Customer("uuid", "John Doe", address, false);

    await customerRepository.create(customer);

    const foundCustomer = await CustomerModel.findOne({
      where: { id: "uuid" },
    });

    expect(foundCustomer.toJSON()).toStrictEqual(
      expect.objectContaining({
        id: "uuid",
        name: "John Doe",
      })
    );
  });

  it("should find all customers", async () => {
    const customerRepository = new CustomerRepository();
    const address1 = new Address("Street 1", 123, "12345", "City");
    const address2 = new Address("Street 2", 456, "67890", "Town");

    const customer1 = new Customer("uuid1", "John Doe", address1, false);
    const customer2 = new Customer("uuid2", "Jane Doe 2", address2, false);

    await customerRepository.create(customer1);
    await customerRepository.create(customer2);

    const customers = await customerRepository.findAll();

    expect(customers).toHaveLength(2);
    expect(customers).toContainEqual(
      expect.objectContaining({
        id: "uuid1",
        name: "John Doe",
      })
    );
    expect(customers).toContainEqual(
      expect.objectContaining({
        id: "uuid2",
        name: "Jane Doe 2",
      })
    );
  });

  it("should throw an error when customer is not found", async () => {
    const customerRepository = new CustomerRepository();
    expect(async () => {
      await customerRepository.find("nonexistent-uuid");
    }).rejects.toThrow("Customer not found");
  });
});
