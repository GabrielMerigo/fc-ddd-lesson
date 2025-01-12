import ProductFactory from "../../../domain/product/factory/product.factory";
import FindProductUseCase from "./find.product.usecase";

const product = ProductFactory.createWithNameAndPrice("Product 1", 100);

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit test for find product use case", () => {
  it("should find a product", async () => {
    const productRepository = MockRepository();
    const useCase = new FindProductUseCase(productRepository);

    const input = {
      id: product.id,
    };

    const output = await useCase.execute(input);

    expect(output.id).toBe(product.id);
    expect(output.name).toBe("Product 1");
    expect(output.price).toBe(100);
  });

  it("should throw an error when product not found", async () => {
    const productRepository = MockRepository();

    jest.spyOn(productRepository, "find").mockReturnValue(Promise.resolve(null));
    const useCase = new FindProductUseCase(productRepository);

    const input = { id: "1" };

    await expect(useCase.execute(input)).rejects.toThrow("Product not found");
  });
});
