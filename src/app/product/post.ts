/*eslint-disable*/
/**
 * this file will hold all the get use-case for product domain
 */
import Product from '../../domain/product';

/**
  * function for create product.
  */
export default ({ productRepository }: any) => {
  // code for getting all the items
  const create = ({ body }: any) =>
    Promise.resolve()
      .then(() => {
        const post = new Product(body);
        return productRepository.create(post);
      })
      .catch((error) => {
        throw new Error(error);
      });

  return {
    create
  }
}
