/*eslint-disable*/
/**
  * function for remove product.
  */
export default ({ productRepository }: any) => {
  const remove = ({ id }: any) =>
    Promise.resolve()
      .then(() =>
        productRepository.remove({
          isDeleted: 1
        }, {
          where: { id }
        }))
      .catch((error) => {
        throw new Error(error);
      });

  return {
    remove
  }
}
