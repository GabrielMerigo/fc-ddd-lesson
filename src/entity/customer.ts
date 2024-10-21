import Address from "./address";

export default class Customer {
  private _id: string;
  private _name: string;
  private _address: Address;
  private _active: boolean;

  constructor(id: string, name: string, address: Address, active: boolean) {
    this._id = id;
    this._name = name;
    this._address = address;
    this._active = active;

    this.validate();
  }

  validate() {
    if (this._id.length === 0) {
      throw new Error("Id is required");
    }

    if (this._name.length === 0) {
      throw new Error("Name is required");
    }
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
  }

  activate() {
    if (this._address === undefined) {
      throw new Error("Address is mandatory to activate a customer");
    }

    return (this._active = true);
  }

  deactivate() {
    return (this._active = false);
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

  get active(): boolean {
    return this._active;
  }

  set name(value: string) {
    this._name = value;
  }

  set address(value: Address) {
    this._address = value;
  }

  set active(active: boolean) {
    this._active = active;
  }
}
