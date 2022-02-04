/*eslint-disable*/
/**
  * function for get one product.
  */

import Product from 'domain/product';

export default ({ productRepository }: any) => {

  const one = ({ id }: any) => {
    try {
      const { product_id }: any = Product({ product_id: +id });
      return productRepository.findById({ product_id });
    } catch (error) {
      throw new Error(error);
    }
  }

  return {
    one
  }
}
