import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { FindCustomerInputDto, FindCustomerOutputDto } from "./find.product.dto";

export default class FindProductUseCase {
  constructor(private readonly productRepository: ProductRepositoryInterface) {}

  async execute(input: FindCustomerInputDto): Promise<FindCustomerOutputDto> {
    const product = await this.productRepository.find(input.id);

    if (!product) {
      throw new Error("Product not found");
    }

    return {
      id: product.id,
      name: product.name,
      price: product.price,
    };
  }
}
