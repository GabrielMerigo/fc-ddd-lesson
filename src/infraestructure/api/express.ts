import express, { Express } from "express";
import { DataTypes, Sequelize } from "sequelize";
import CustomerModel from "../customer/repository-impl/customer.model";
import { customerRouter } from "./routes/customer.routes";
import { productRouter } from "./routes/product.routes";
import ProductModel from "../product/repository-impl/product.model";

export const app: Express = express();

app.use(express.json());

app.use("/customers", customerRouter);
app.use("/products", productRouter);

export let sequelize: Sequelize;

async function setupDb() {
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
        type: DataTypes.NUMBER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  
  await sequelize.sync({ force: true });
}

setupDb();
