/*eslint-disable*/
/**
  * function for get one product.
  */

import Product from 'domain/product';

export default ({ productRepository }: any) => {

  const one = async ({ id }: any) => {
    try {

      console.log('-----> product id', id);

      const product = Product({ product_id: +id });

      return await productRepository.findById(product);
    } catch (error) {
      throw new Error(error);
    }
  }

  /*const one = ({ id }: any) =>
     Promise.resolve()
      .then(() =>
        productRepository.findById({product_id: id })
      )
      .catch(error => {
        throw new Error(error);
      });*/

  return {
    one
  }
}
