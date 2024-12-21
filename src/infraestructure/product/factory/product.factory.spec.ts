import ProductFactory from "./product.factory";

describe("ProductFactory", () => {
  it("should create a product type A", () => {
    const product = ProductFactory.create({
      type: "A",
      name: "Product A",
      price: 100,
    });
    expect(product).toBeDefined();

    expect(product.id).toBeDefined();
    expect(product.name).toBe("Product A");
    expect(product.price).toBe(100);

    expect(product.constructor.name).toBe("Product");
  });

  it("should create a product type B", () => {
    const product = ProductFactory.create({
      type: "B",
      name: "Product B",
      price: 200,
    });
    expect(product).toBeDefined();

    expect(product.id).toBeDefined();
    expect(product.name).toBe("Product B");
    expect(product.price).toBe(400);

    expect(product.constructor.name).toBe("ProductB");
  });

  it("should throw an error when creating a product with an invalid type", () => {
    expect(() =>
      ProductFactory.create({ type: "C", name: "Product C", price: 300 })
    ).toThrow("Invalid product type");
  });
});
