import Product from "./product";

describe("Product Unit Tests", () => {
  it("should throw error when ID is empty", () => {
    expect(() => {
      new Product("", "Product 1", 100);
    }).toThrow("Id is required");
  });

  it("should throw error when Name is empty", () => {
    expect(() => {
      new Product("uuid", "", 100);
    }).toThrow("Name is required");
  });

  it("should throw error when price less than 0", () => {
    expect(() => {
      new Product("uuid", "product name", -1);
    }).toThrow("Price must be greater than 0");
  });
});
