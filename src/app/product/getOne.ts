/*eslint-disable*/
/**
  * function for get one product.
  */

import Product from 'domain/product';

export default ({ productRepository }: any) => {

  const one = async ({ id }: any) => {
    try {
      const product = Product({ product_id: +id });
      return await productRepository.findById(product);
    } catch (error) {
      throw new Error(error);
    }
  }

  return {
    one
  }
}
