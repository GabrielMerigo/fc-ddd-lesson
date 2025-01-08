import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infraestructure/product/repository-impl/product.model";
import ProductRepository from "../../../infraestructure/product/repository-impl/product.repository";
import Product from "../../../domain/product/entity/product";
import ListProductUseCase from "./list.product.usecase";

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

  it("should list a product", async () => { 
    const productRepository = new ProductRepository();
    const useCase = new ListProductUseCase(productRepository);    

    const product1 = new Product("uuid1", "Product 1", 100);
    const product2 = new Product("uuid2", "Product 2", 200);

    await Promise.all([
      productRepository.create(product1),
      productRepository.create(product2),
    ])

    const output = await useCase.execute({});

    expect(output.products.length).toBe(2);
    expect(output.products[0].id).toBe(product1.id);
    expect(output.products[0].name).toBe(product1.name);
    expect(output.products[0].price).toBe(product1.price);
    expect(output.products[1].id).toBe(product2.id);
    expect(output.products[1].name).toBe(product2.name);
    expect(output.products[1].price).toBe(product2.price);
  })
})
