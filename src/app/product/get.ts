/*eslint-disable*/
/**
  * function for get all post.
  */
export default ({ productRepository }: any) => {
  const all = () =>
     Promise
      .resolve()
      .then(() =>
        productRepository.getAll({
          attributes: [
            'product_id', 'name'
          ]
        })
      )
      .catch(error => {
        throw new Error(error);
      });

  return {
    all
  }
}
