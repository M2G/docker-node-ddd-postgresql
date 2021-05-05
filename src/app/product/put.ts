/*eslint-disable*/
/**
 * this file will hold all the get use-case for post domain
 */
import Product from '../../domain/product';

/**
  * function for update product.
  */
export default ({ productRepository }: any) => {
  const update = ({ id, body }: any) =>
    new Promise(async (resolve, reject) => {
      try {
        const post = new Product(body);
        await productRepository.update(post, {
          where: { id }
        })
        return resolve(post);
      } catch (error) {
        return reject(error);
      }
    });

  return {
    update
  }
}
