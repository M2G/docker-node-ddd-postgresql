/*eslint-disable*/
/**
 * this file will hold all the get use-case for product domain
 */
import Product from 'domain/product';
import { cleanData } from 'interfaces/http/utils';
/**
 * function for update product.
 */
export default ({ productRepository }: any) => {
  const update = ({ id, ...args }: any) => {
    try {
      const product = Product(args);
      return productRepository.update(cleanData(product), {
        where: { product_id: id },
        returning: true,
        plain: true,
      });
    } catch (error: any) {
      throw new Error(error);
    }
  };

  return {
    update,
  };
};
