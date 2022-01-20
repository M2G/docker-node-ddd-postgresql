/*eslint-disable*/
/**
  * function for get one product.
  */

import Product from 'domain/product';

export default ({ productRepository }: any) => {

  const one = ({ id }: any) => {
    try {
      const { product_id: productId }: any = Product({ product_id: +id });
      return productRepository.findById({ product_id: productId });
    } catch (error) {
      throw new Error(error);
    }
  }

  return {
    one
  }
}
