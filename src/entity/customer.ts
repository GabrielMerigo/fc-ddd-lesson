import Address from "./address";

export default class Customer {
  _id: string;
  _name: string;
  _address: Address;

  constructor(id: string, name: string, address: Address) {
    this._id = id;
    this._name = name;
    this._address = address;
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get address(): Address {
    return this._address;
  }

  set name(value: string) {
    this._name = value;
  }

  set address(value: Address) {
    this._address = value;
  }
}
