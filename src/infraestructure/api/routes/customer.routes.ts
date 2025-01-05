import { Router, Request, Response } from "express";
import CustomerRepository from "../../customer/repository-impl/customer.repository";
import { CreateCustomerUseCase } from "../../../use-cases/customer/create/create.customer.usecase";
import ListCustomerUseCase from "../../../use-cases/customer/list/list.customer.usecase";

export const customerRouter = Router();

customerRouter.post("/", async (req: Request, res: Response) => {
  const customerRepository = new CustomerRepository();
  const useCase = new CreateCustomerUseCase(customerRepository);

  try {
    const customerDto = {
      name: req.body.name,
      address: {
        street: req.body.address.street,
        city: req.body.address.city,
        number: req.body.address.number,
        zip: req.body.address.zip,
      },
    };

    const output = await useCase.execute(customerDto);
    res.send(output);
  } catch (err) {
    res.status(500).send(err);
  }
});

customerRouter.get("/", async (req: Request, res: Response) => {
  const customerRepository = new CustomerRepository();
  const useCase = new ListCustomerUseCase(customerRepository);
  const output = await useCase.execute({});

  res.send({
    customers: output.customers.map((customer) => ({
      id: customer.id,
      name: customer.name,
      address: {
        street: customer.address.street,
        city: customer.address.city,
        number: customer.address.number,
        zip: customer.address.zip,
      },
    })),
  });
});
