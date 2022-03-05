/*eslint-disable*/
/**
 * this file will hold all the get use-case for product domain
 */
import Product from 'domain/product';
import { cleanData } from 'interfaces/http/utils';
/**
 * function for create product.
 */
export default ({ productRepository }: any) => {
  const create = ({ ...args }: any) => {
    try {
      const product = Product(args);

      console.log('--------> product', product);

      return productRepository.create(cleanData(product));
    } catch (error: any) {
      throw new Error(error);
    }
  };

  return {
    create,
  };
};
