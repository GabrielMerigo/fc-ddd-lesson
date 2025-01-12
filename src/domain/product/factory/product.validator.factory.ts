import ValidatorInterface from "../../@shared/validator/validator.interface";
import Product from "../entity/product";
import ProductYupValidator from "../validator/product.yup.validator";

export default class ProductValidatorFactory {
  static execute(): ValidatorInterface<Product> {
    return new ProductYupValidator();
  }
}
