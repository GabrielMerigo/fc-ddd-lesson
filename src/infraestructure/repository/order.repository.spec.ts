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
      {},
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
});
