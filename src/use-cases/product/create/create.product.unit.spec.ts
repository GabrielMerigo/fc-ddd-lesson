import CreateProductUseCase from "./create.product.usecase";


const MockRepository = () => {
  return {
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn(),
    findAll: jest.fn(),
  };
};

describe("Unit test for create product use case", () => {
  it("should create a product", async () => {
    const productRepository = MockRepository();
    const useCase = new CreateProductUseCase(productRepository);

    const input = {
      name: "Product 1",
      price: 100,
    };

    const output = await useCase.execute(input);

    expect(output.id).toBeDefined();
    expect(output.name).toBe(input.name);
    expect(output.price).toBe(input.price);
  });

  it("should throw an error when name is missing", async () => {
    const productRepository = MockRepository();
    const useCase = new CreateProductUseCase(productRepository);

    expect(useCase.execute({ name: "", price: 100 })).rejects.toThrow("Name is required");
  });

  it("should throw an error when price is less than 0", async () => {
    const productRepository = MockRepository();
    const useCase = new CreateProductUseCase(productRepository);

    expect(useCase.execute({ name: "Product 1", price: -1 })).rejects.toThrow("Price must be greater than 0");
  });
});
