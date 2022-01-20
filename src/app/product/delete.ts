/*eslint-disable*/
import Product from 'domain/product';

/**
  * function for remove product.
  */
export default ({ productRepository }: any) => {

  const remove = ({ id }: number | any) => {
    try {
      const { product_id: productId }: any = Product({ product_id: +id });
      return productRepository.destroy({ where: { product_id: productId } });
    } catch (error) {
      throw new Error(error);
    }
  }

  return {
    remove
  }
}
