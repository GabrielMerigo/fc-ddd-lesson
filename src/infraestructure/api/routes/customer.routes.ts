import { Router, Request, Response } from "express";
import CustomerRepository from "../../customer/repository-impl/customer.repository";
import { CreateCustomerUseCase } from "../../../use-cases/customer/create/create.customer.usecase";

export const customerRouter = Router();

customerRouter.post("/", async (req: Request, res: Response) => {
  const customerRepository = new CustomerRepository();
  const useCase = new CreateCustomerUseCase(customerRepository);

  try {
    const customerDto = {
      name: req.body.name,
      address: req.body.address,
    };

    const output = await useCase.execute(customerDto);
    res.send(output);
  } catch (err) {
    res.status(500).send(err);
  }
});
