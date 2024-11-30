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

  get street(): string {
    return this._street;
  }

  get number(): number {
    return this._number;
  }

  get zip(): string {
    return this._zip;
  }

  get city(): string {
    return this._city;
  }
}
