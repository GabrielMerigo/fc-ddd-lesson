import { DataTypes, Sequelize } from "sequelize";
import ProductModel from "./product.model";
import Product from "../../../domain/product/entity/product";
import ProductRepository from "./product.repository";

describe("Product Repository Test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
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
        modelName: "Product",
      }
    );

    await sequelize.sync({ force: true });
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const productRepository = new ProductRepository();
    const product = new Product("uuid", "milk", 200);

    await productRepository.create(product);
    const productModel = await ProductModel.findOne({ where: { id: "uuid" } });
    expect(productModel.toJSON()).toStrictEqual(
      expect.objectContaining({
        id: "uuid",
        name: "milk",
        price: 200,
      })
    );
  });

  it("should update a product", async () => {
    const productRepository = new ProductRepository();
    const product = new Product("uuid", "milk", 200);

    await productRepository.create(product);
    product.changeName("water");
    await productRepository.update(product);

    const productModel = await ProductModel.findOne({ where: { id: "uuid" } });
    expect(productModel.toJSON()).toStrictEqual(
      expect.objectContaining({
        id: "uuid",
        name: "water",
        price: 200,
      })
    );
  });

  it("should find a product", async () => {
    const productRepository = new ProductRepository();
    const product = new Product("uuid", "milk", 200);

    await productRepository.create(product);
    const productModel = await ProductModel.findOne({ where: { id: "uuid" } });
    expect(productModel.toJSON()).toStrictEqual(
      expect.objectContaining({
        id: "uuid",
        name: "milk",
        price: 200,
      })
    );
  });

  it("should find all products", async () => {
    const productRepository = new ProductRepository();
    const product1 = new Product("uuid1", "milk", 200);
    const product2 = new Product("uuid2", "water", 300);

    await productRepository.create(product1);
    await productRepository.create(product2);

    const products = await productRepository.findAll();
    expect(products).toHaveLength(2);
    expect(products).toContainEqual(product1);
    expect(products).toContainEqual(product2);
  });
});
