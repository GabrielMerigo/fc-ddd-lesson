import Address from "../../../domain/customer/value-object/address";

interface Customer {
  id: string;
  name: string;
  address: Address;
}

export interface InputListCustomerDto {}

export interface OutputListCustomerDto {
  customers: Customer[];
}
