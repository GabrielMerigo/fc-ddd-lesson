import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import { v4 as uuid } from "uuid";

export default class CustomerFactory {
  static createWithoutAddress(
    name: string,
    active: boolean = false
    ): Customer {
    return new Customer(uuid(), name, undefined, active);
  }

  static createWithAddress(
    name: string,
    address: Address,
    active: boolean = false
  ): Customer {
    return new Customer(uuid(), name, address, active);
  }
}
