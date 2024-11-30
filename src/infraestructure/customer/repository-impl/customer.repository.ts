import CustomerModel from "./customer.model";
import Customer from "../../../domain/customer/entity/customer";
import RepositoryInterface from "../../../domain/@shared/repository/repository.interface";
import Address from "../../../domain/customer/value-object/address";

export default class CustomerRepository
  implements RepositoryInterface<Customer>
{
  async update(entity: Customer): Promise<void> {
    await CustomerModel.update(
      {
        name: entity.name,
        street: entity.address.street,
        number: entity.address.number,
        zipCode: entity.address.zip,
        city: entity.address.city,
        active: entity.active,
        rewardPoints: entity.rewardPoints,
      },
      { where: { id: entity.id } }
    );
  }

  async find(id: string): Promise<Customer> {
    try {
      const customerModel = await CustomerModel.findOne({ where: { id } });

      return new Customer(
        customerModel.id,
        customerModel.name,
        new Address(
          customerModel.street,
          customerModel.number,
          customerModel.zipCode,
          customerModel.city
        ),
        customerModel.active
      );
    } catch (error) {
      throw new Error("Customer not found");
    }
  }

  async findAll(): Promise<Customer[]> {
    const customers = await CustomerModel.findAll();

    return customers.map((customerModel) => {
      return new Customer(
        customerModel.id,
        customerModel.name,
        new Address(
          customerModel.street,
          customerModel.number,
          customerModel.zipCode,
          customerModel.city
        ),
        customerModel.active
      );
    });
  }

  async create(entity: Customer): Promise<void> {
    await CustomerModel.create({
      id: entity.id,
      name: entity.name,
      street: entity.address.street,
      zipCode: entity.zipCode,
      city: entity.address.city,
      number: entity.address.number,
      active: entity.active,
      rewardPoints: entity.rewardPoints,
    });
  }
}
