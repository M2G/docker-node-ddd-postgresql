/*eslint-disable*/
/**
 * this file will hold all the get use-case for product domain
 */
import Product from 'domain/product';

/**
  * function for create product.
  */
export default ({ productRepository }: any) => {
  const create = ({ body }: any) => {
    try {
      const product = Product({ ...body });
      return productRepository.create(product);
    } catch (error) {
      throw new Error(error);
    }
  }
  return {
    create
  }
}
