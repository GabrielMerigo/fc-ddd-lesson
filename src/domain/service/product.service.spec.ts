import Product from "../entity/product";
import ProductService from "./product.service";

describe("Product service unit tests", () => {
  it("should change the prices of all products", () => {
    const productOne = new Product("uuid1", "name of the product - 1", 10);
    const productTwo = new Product("uuid2", "name of the product - 2", 20);
    const products = [productOne, productTwo];

    ProductService.increasePrice(products, 100);

    expect(productOne.price).toBe(20);
    expect(productTwo.price).toBe(40);
  });
});
