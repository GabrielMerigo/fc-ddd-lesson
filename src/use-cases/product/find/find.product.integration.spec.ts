import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infraestructure/product/repository-impl/product.model";
import ProductRepository from "../../../infraestructure/product/repository-impl/product.repository";
import FindProductUseCase from "./find.product.usecase";
import Product from "../../../domain/product/entity/product";

describe("[Integration] Find product use case", () => {

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

  it("should find a product", async () => {
    const productRepository = new ProductRepository();
    const useCase = new FindProductUseCase(productRepository);

    const product = new Product("uuid", "Product 1", 100);
    await productRepository.create(product);

    const output = await useCase.execute({ id: "uuid" });

    expect(output).toEqual({
      id: "uuid",
      name: "Product 1",
      price: 100,
    });
  })
})
