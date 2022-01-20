/*eslint-disable*/
/**
 * this file will hold all the get use-case for post domain
 */
import Product from 'domain/product';
import { cleanData } from 'interfaces/http/utils';
/**
  * function for update product.
  */
export default ({ productRepository }: any) => {
  const update = ({ id, body }: any) => {
      try {
        const post = Product({ ...body });
        return productRepository.update(cleanData(post), {
          where: { product_id: id },
          returning: true,
          plain: true
        });
      } catch (error) {
        throw new Error(error);
      }
  }
  return {
    update
  }
}
