/*eslint-disable*/
/**
  * function for get all product.
  */
export default ({ productRepository }: any) => {
  const all = () => {

    try {
    return productRepository.getAll({
        attributes: [
          'product_id', 'name'
        ]
      });
    } catch (error) {
      throw new Error(error);
    }

   /*  Promise.resolve()
      .then(() =>
        productRepository.getAll({
          attributes: [
            'product_id', 'name'
          ]
        })
      )
      .catch(error => {
        throw new Error(error);
      });*/
  }

  return {
    all
  }
}
