import Product from "../../../domain/product/entity/product";
import ProductInterface from "../../../domain/product/entity/product.interface";
import { v4 as uuid } from "uuid";
import ProductB from "../../../domain/product/entity/productB";

interface ProductFactoryProps {
  type: string;
  name: string;
  price: number;
}

export default class ProductFactory {
  static create({ type, name, price }: ProductFactoryProps): ProductInterface {
    switch (type) {
      case "A":
        return new Product(uuid(), name, price);
      case "B":
        return new ProductB(uuid(), name, price);
      default:
        throw new Error("Invalid product type");
    }
  }
}
