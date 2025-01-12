import { toXML } from "jstoxml";
import { OutputListCustomerDto } from "../../../use-cases/customer/list/list.customer.dto";

export default class CustomerPresenter {
  static toJSON(data: OutputListCustomerDto): string {
    return JSON.stringify({
      customers: data.customers.map((customer) => ({
        id: customer.id,
        name: customer.name,
        address: {
          street: customer.address.street,
          number: customer.address.number,
          zip: customer.address.zip,
          city: customer.address.city,
        },
      })),
    });
  }

  static toXml(data: OutputListCustomerDto): string {
    const xmlOptions = {
      header: true,
      indent: "  ",
      newLine: "\n",
      allowEmpty: true,
    };

    return toXML(
      {
        customers: {
          customer: data.customers.map((customer) => ({
            id: customer.id,
            name: customer.name,
            address: {
              street: customer.address.street,
              number: customer.address.number,
              zip: customer.address.zip,
              city: customer.address.city,
            },
          })),
        },
      },
      xmlOptions
    );
  }
}
