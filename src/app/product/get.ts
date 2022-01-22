/*eslint-disable*/
const KEY = 'LIST_PRODUCT';
const TTL = 0.6 * 60;

/**
  * function for get all product.
  */
export default ({ productRepository, redis }: any) => {
  const all = async (params: any) => {
    try {

      const cachingListProduct = await redis.get(KEY);

        if (cachingListProduct) return cachingListProduct;

      const productList =  productRepository.getAll(params);

      await redis.set(KEY, JSON.stringify(productList), TTL);

      return productList;

    } catch (error: unknown) {
      throw new Error(error as string | undefined);
    }
  };

  return {
    all
  };
};
