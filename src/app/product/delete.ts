/*eslint-disable*/
/**
  * function for remove product.
  */
export default ({ productRepository }: any) => {

  const remove = ({ id }: any) => {
    try {
      return productRepository.destroy({ where: { product_id: id } });
    } catch (error) {
      throw new Error(error);
    }
  }

  return {
    remove
  }
}
