import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import { v4 as uuid } from "uuid";

export default class CustomerFactory {
  static create(
    type: string,
    name: string,
    address: Address,
    active: boolean
  ): Customer {
    switch (type) {
      case "A":
        return new Customer(uuid(), name, address, active);
      default:
        throw new Error("Invalid customer type");
    }
  }
}
