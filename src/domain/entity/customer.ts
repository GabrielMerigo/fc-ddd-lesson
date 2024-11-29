import { EventDispatcherSingleton } from "../event/@shared/event-dispatcher-singleton";
import CustomerChangeAddressEvent from "../event/customer/customer-change-address.event";
import CustomerCreatedEvent from "../event/customer/customer-created.event";
import Address from "./address";

export default class Customer {
  private _id: string;
  private _name: string;
  private _address: Address;
  private _active: boolean;
  private _rewardPoints: number = 0;

  constructor(id: string, name: string, address: Address, active: boolean) {
    this._id = id;
    this._name = name;
    this._address = address;
    this._active = active;

    this.validate();

    const eventDispatcher = EventDispatcherSingleton.getInstance();
    const customerCreatedEvent = new CustomerCreatedEvent(this);
    eventDispatcher.notify(customerCreatedEvent);
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

  changeAddress(address: Address) {
    this._address = address;
    const eventDispatcher = EventDispatcherSingleton.getInstance();
    const customerChangeAddressEvent = new CustomerChangeAddressEvent({
      id: this._id,
      name: this._name,
      street: this._address.street,
    });
    eventDispatcher.notify(customerChangeAddressEvent);
  }

  activate() {
    if (this._address === undefined) {
      throw new Error("Address is mandatory to activate a customer");
    }

    return (this._active = true);
  }

  get zipCode(): string {
    return this._address.zip;
  }

  deactivate() {
    return (this._active = false);
  }

  addRewardPoints(points: number) {
    this._rewardPoints += points;
  }

  get rewardPoints(): number {
    return this._rewardPoints;
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
