import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infraestructure/product/repository-impl/product.model";
import ProductRepository from "../../../infraestructure/product/repository-impl/product.repository";
import Product from "../../../domain/product/entity/product";
import UpdateProductUseCase from "./update.product.usecase";

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

  it("should update a product", async () => { 
    const productRepository = new ProductRepository();
    const useCase = new UpdateProductUseCase(productRepository);    

    const product = new Product("uuid", "Product 1", 100);
    await productRepository.create(product);

    const input = {
      id: "uuid",
      name: "Product 2",
      price: 200,
    }

    const output = await useCase.execute(input);

    expect(output).toEqual({
      id: "uuid",
      name: "Product 2",
      price: 200,
    });
  })
})
