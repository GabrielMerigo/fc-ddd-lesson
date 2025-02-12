import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infraestructure/product/repository-impl/product.model";
import ProductRepository from "../../../infraestructure/product/repository-impl/product.repository";
import CreateProductUseCase from "./create.product.usecase";

describe("[Integration] Create product use case", () => {

  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  })

  afterEach(async () => {
    await sequelize.close();
  })

  it("should create a product", async () => {
    const productRepository = new ProductRepository();
    const useCase = new CreateProductUseCase(productRepository);

    const input = {
      name: "Product 1",
      price: 100,
    }

    const output = await useCase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: "Product 1",
      price: 100,
    });
  })
})