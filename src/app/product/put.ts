/*eslint-disable*/
/**
 * this file will hold all the get use-case for post domain
 */
import Product from 'domain/product';

/**
  * function for update product.
  */
export default ({ productRepository }: any) => {
  const update = ({ id, body }: any) => {
      try {
        const post = Product({ ...body });
        return productRepository.update(post, {
          where: { product_id: id }
        })
      } catch (error) {
        throw new Error(error);
      }
  }
  return {
    update
  }
}
