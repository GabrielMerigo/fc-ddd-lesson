import ValidatorInterface from "../../@shared/validator/validator.interface";
import Product from "../entity/product";

import * as yup from "yup";

export default class ProductYupValidator
  implements ValidatorInterface<Product>
{
  validate(entity: Product): void {
    try {
      yup
        .object()
        .shape({
          id: yup.string().required("Id is required"),
          name: yup.string().required("Name is required"),
          price: yup
            .number()
            .required("Price is required")
            .moreThan(0, "Price must be greater than 0"),
        })
        .validateSync(entity);
    } catch (error) {
      const e = error as yup.ValidationError;

      e.errors.forEach((error) => {
        entity.notification.addError({
          context: "product",
          message: error,
        });
      });
    }
  }
}
