import ProductFactory from "../../../domain/product/factory/product.factory";
import ListProductUseCase from "./list.product.usecase";

const productOne = ProductFactory.createWithNameAndPrice("Product 1", 100);
const productTwo = ProductFactory.createWithNameAndPrice("Product 2", 200);


const MockRepository = () => {
  return {
    findAll: jest.fn().mockReturnValue(Promise.resolve([productOne, productTwo])),
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn(),
  };
};

describe("Unit test for listing products use case", () => {
  it("should list products", async () => {
    const productRepository = MockRepository();
    const useCase = new ListProductUseCase(productRepository);

    const output = await useCase.execute({});

    expect(output.products.length).toBe(2);
    expect(output.products[0].id).toBeDefined();
    expect(output.products[0].name).toBe("Product 1");
    expect(output.products[0].price).toBe(100);
    expect(output.products[1].id).toBeDefined();
    expect(output.products[1].name).toBe("Product 2");
    expect(output.products[1].price).toBe(200);
  });
});