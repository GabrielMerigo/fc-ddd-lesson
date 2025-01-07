import Product from "./product";

describe("Product Unit Tests", () => {
  it("should throw error when ID is empty", () => {
    expect(() => {
      new Product("", "Product 1", 100);
    }).toThrow("product: Id is required");
  });

  it("should throw error when Name is empty", () => {
    expect(() => {
      new Product("uuid", "", 100);
    }).toThrow("product: Name is required");
  });

  it("should throw error when price less than 0", () => {
    expect(() => {
      new Product("uuid", "product name", -1);
    }).toThrow("product: Price must be greater than 0");
  });

  it("should change name", () => {
    const product = new Product("uuid", "product name 1", 12);

    expect(product.name).toBe("product name 1");

    product.changeName("Product name 2");

    expect(product.name).toBe("Product name 2");
  });

  it("should change price", () => {
    const product = new Product("uuid", "product name 1", 12);

    expect(product.price).toBe(12);

    product.changePrice(15);

    expect(product.price).toBe(15);
  });

  it("should not let change name", () => {
    expect(() => {
      new Product("uuid", "", 12);
    }).toThrow("Name is required");
  });
});
