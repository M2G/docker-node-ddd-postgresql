/*eslint-disable*/
/**
  * function for get one product.
  */
export default ({ productRepository }: any) => {

  const one = async ({ id }: any) => {
    try {
      return await productRepository.findById({ id });
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
