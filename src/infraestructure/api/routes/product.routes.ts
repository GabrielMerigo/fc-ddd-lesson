import { Router, Request, Response } from "express";
import ProductRepository from "../../product/repository-impl/product.repository";
import ListProductUseCase from "../../../use-cases/product/list/list.product.usecase";
import CreateProductUseCase from "../../../use-cases/product/create/create.product.usecase";

export const productRouter = Router();

productRouter.post("/", async (req: Request, res: Response) => {
  const productRepository = new ProductRepository();
  const useCase = new CreateProductUseCase(productRepository);

  try {
    const productDto = {
      name: req.body.name,
      price: req.body.price,
    };

    const output = await useCase.execute(productDto);

    res.send(output);
  } catch (err) {
    res.status(500).send(err);
  }
});

productRouter.get("/", async (req: Request, res: Response) => {
  const productRepository = new ProductRepository();
  const useCase = new ListProductUseCase(productRepository);
  const output = await useCase.execute({});

  res.send({
    products: output.products.map((product) => ({
      id: product.id,
      name: product.name,
      price: product.price,
    })),
  });
});
