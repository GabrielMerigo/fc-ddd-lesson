import CustomerRepository from "../../../infraestructure/customer/repository-impl/customer.repository";
import { InputCreateCustomerDto, OutputCreateCustomerDto } from "./create.customer.dto";
import Address from "../../../domain/customer/value-object/address";
import CustomerFactory from "../../../infraestructure/customer/factory/customer.factory";

export class CreateCustomerUseCase {
  private customerRepository: CustomerRepository;

  constructor(customerRepository: CustomerRepository) {
    this.customerRepository = customerRepository;
  }

  async execute(input: InputCreateCustomerDto): Promise<OutputCreateCustomerDto> {    
    const customer = CustomerFactory.createWithAddress(
      input.name, 
      new Address(input.address.street, input.address.number, input.address.zip, input.address.city)
    );
    
    await this.customerRepository.create(customer);

    return {  
      id: customer.id,
      name: customer.name,
      address: customer.address,
    };
  }
}

