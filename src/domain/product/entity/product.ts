import { Entity } from "../../@shared/entity/entity.abstract";

export default class Product extends Entity {
  private _name: string;
  private _price: number;

  constructor(id: string, name: string, price: number) {
    super();
    this._id = id;
    this._name = name;
    this._price = price;

    this.validate();
  }

  validate() {
    if (!this._id) {
      this.notification.addError({
        context: "product",
        message: "Id is required",
      });
    }

    if (this._name.length === 0 || this._name === "") {
      this.notification.addError({
        context: "product",
        message: "Name is required",
      });
    }

    if (this._price < 0) {
      this.notification.addError({
        context: "product",
        message: "Price must be greater than 0",
      });
    }

    if (this.notification.hasErrors()) {
      throw new Error(this.notification.messages());
    }
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get price() {
    return this._price;
  }

  changeName(value: string) {
    this._name = value;
    this.validate();
  }

  changePrice(value: number) {
    this._price = value;
    this.validate();
  }
}
