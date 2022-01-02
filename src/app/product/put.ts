/*eslint-disable*/
/**
 * this file will hold all the get use-case for post domain
 */
import Product from 'domain/product';

/**
  * function for update product.
  */
export default ({ productRepository }: any) => {
  const update = async ({ id, body }: any) => {
      try {
        const post = new Product(body);
        return await productRepository.update(post, {
          where: { id }
        })
      } catch (error) {
        throw new Error(error);
      }
  }
  return {
    update
  }
}
