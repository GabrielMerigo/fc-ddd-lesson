import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import ProductFactory from "../../../infraestructure/product/factory/product.factory";

export default class CreateProductUseCase {
  constructor(private productRepository: ProductRepositoryInterface) {}

  async execute(input: InputCreateProductDto): Promise<OutputCreateProductDto> {
    const product = ProductFactory.createWithNameAndPrice(input.name, input.price);

    await this.productRepository.create(product);
    
    return {
      id: product.id,
      name: product.name,
      price: product.price,
    };
  }
}