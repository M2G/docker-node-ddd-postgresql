/*eslint-disable*/
/**
  * function for get all product.
  */
export default ({ productRepository }: any) => {
  const all = async () => {

    try {
    return await productRepository.getAll({
        attributes: [
          'product_id', 'product_name'
        ]
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  return {
    all
  }
}
