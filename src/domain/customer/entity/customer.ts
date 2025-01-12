import { Entity } from "../../@shared/entity/entity.abstract";
import { EventDispatcherSingleton } from "../../@shared/event/event-dispatcher-singleton";
import NotificationError from "../../@shared/notification/notification.error";
import CustomerChangeAddressEvent from "../event/customer-change-address.event";
import CustomerCreatedEvent from "../event/customer-created.event";
import CustomerValidatorFactory from "../factory/customer.validator.factory";
import Address from "../value-object/address";

export default class Customer extends Entity {
  private _name: string;
  private _address: Address;
  private _active: boolean;
  private _rewardPoints: number = 0;

  constructor(
    id: string,
    name: string,
    address?: Address,
    active: boolean = false
  ) {
    super();
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
    CustomerValidatorFactory.execute().validate(this);

    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors());
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
      id: this.id,
      name: this._name,
      street: this._address.street,
    });
    eventDispatcher.notify(customerChangeAddressEvent);
  }

  activate() {
    if (this._address === undefined) {
      this.notification.addError({
        context: "customer",
        message: "Address is mandatory to activate a customer",
      });
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
