import ProductFactory from "../../../infraestructure/product/factory/product.factory";
import ListProductUseCase from "../list/list.product.usecase";
import UpdateProductUseCase from "./update.product.usecase";

const product = ProductFactory.createWithNameAndPrice("Product 1", 100);

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    update: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve([product])),
    create: jest.fn(),
  };
};

describe("Unit test for update product use case", () => {
  it("should update a product", async () => {
    const productRepository = MockRepository();
    const findProductUseCase = new ListProductUseCase(productRepository);
    const updateProductUseCase = new UpdateProductUseCase(productRepository);

    const findProductOutput = await findProductUseCase.execute({});

    expect(findProductOutput.products.length).toBe(1);
    expect(findProductOutput.products[0].id).toBe(product.id);
    expect(findProductOutput.products[0].name).toBe(product.name);
    expect(findProductOutput.products[0].price).toBe(product.price);

    const input = {
      id: product.id,
      name: "Product 1 updated",
      price: 200,
    };

    const output = await updateProductUseCase.execute(input);

    expect(output.id).toBe(product.id);
    expect(output.name).toBe("Product 1 updated");
    expect(output.price).toBe(200);
  });

  it("should throw an error when product not found", async () => {
    const productRepository = MockRepository();

    productRepository.find.mockImplementation(() => {
      throw new Error("Product not found");
    });

    const updateProductUseCase = new UpdateProductUseCase(productRepository);

    const input = {
      id: "1",
      name: "Product 1 updated",
      price: 200,
    };

    await expect(updateProductUseCase.execute(input)).rejects.toThrow("Product not found");
  });

  it("should throw an error when name is missing or empty", async () => {
    const productRepository = MockRepository();

    productRepository.find.mockImplementation(() => {
      throw new Error("Name is required");
    });

    const usaCase = new UpdateProductUseCase(productRepository);

    const input = {
      name: "",
      id: "1",
      price: 200,
    };

    await expect(usaCase.execute(input)).rejects.toThrow("Name is required");
  });

  it("should throw an error when price is less than 0", async () => {
    const productRepository = MockRepository();
    const useCase = new UpdateProductUseCase(productRepository);

    const input = {
      id: "1",
      name: "Product 1 updated",
      price: -100,
    };

    await expect(useCase.execute(input)).rejects.toThrow("Price must be greater than 0");
  });

  it("should throw an error when product was not found", async () => {
    const productRepository = MockRepository();

    jest.spyOn(productRepository, "find").mockReturnValue(Promise.resolve(null));

    const useCase = new UpdateProductUseCase(productRepository);

    const input = { id: "1", name: "Product 1 updated", price: 200 };

    await expect(useCase.execute(input)).rejects.toThrow("Product not found");
  });
});
