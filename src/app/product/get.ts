/*eslint-disable*/
/**
  * function for get all product.
  */
export default ({ productRepository }: any) => {
  const all = (params: any) => {
    try {
    return productRepository.getAll(params);
    } catch (error) {
      throw new Error(error);
    }
  }

  return {
    all
  }
}
