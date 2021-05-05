/*eslint-disable*/
/**
  * function for get one product.
  */
export default ({ productRepository }: any) => {
  const one = ({ id }: any) =>
     Promise
      .resolve()
      .then(() =>
        productRepository.findById({
          attributes: [
            'product_id', 'name'
          ],
          where: { id }
        })
      )
      .catch(error => {
        throw new Error(error);
      });

  return {
    one
  }
}
