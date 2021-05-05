/*eslint-disable*/
/**
  * function for get one product.
  */
export default ({ productRepository }: any) => {
  const one = ({ country_id }: any) =>
     Promise
      .resolve()
      .then(() =>
        productRepository.findById({
          attributes: [
            'country_id', 'country_name'
          ],
          where: { country_id }
        })
      )
      .catch(error => {
        throw new Error(error);
      });

  return {
    one
  }
}
