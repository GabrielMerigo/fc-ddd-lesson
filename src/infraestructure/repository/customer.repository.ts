import Address from "../../domain/entity/address";
import Customer from "../../domain/entity/customer";
import CustomerRepositoryInterface from "../../domain/repository/customer-repository.interface";
import CustomerModel from "../db/sequelize/model/customer.model";

export default class CustomerRepository implements CustomerRepositoryInterface {
  async update(entity: Customer): Promise<void> {
    await CustomerModel.update(
      {
        name: entity.name,
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
