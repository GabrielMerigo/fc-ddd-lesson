export default class Address {
  _street: string;
  _number: number;
  _zip: string;
  _city: string;

  constructor(_street: string, _number: number, _zip: string, _city: string) {
    this._street = _street;
    this._number = _number;
    this._zip = _zip;
    this._city = _city;
  }
}
