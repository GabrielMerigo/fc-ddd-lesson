import Product from "../../../domain/product/entity/product";
import { v4 as uuid } from "uuid";

export default class ProductFactory {
  static createWithNameAndPrice(name: string, price: number): Product {
   return new Product(uuid(), name, price);   
  }
}
