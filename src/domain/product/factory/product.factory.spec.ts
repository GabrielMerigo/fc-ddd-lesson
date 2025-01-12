import ProductFactory from "./product.factory";

describe("ProductFactory", () => {
  it("should create a product with name and price", () => {
    const product = ProductFactory.createWithNameAndPrice("Milk", 100);
    
    expect(product).toBeDefined();

    expect(product.id).toBeDefined();
    expect(product.name).toBe("Milk");
    expect(product.price).toBe(100);

    expect(product.constructor.name).toBe("Product");
  });
});
