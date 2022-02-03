/*eslint-disable*/
/**
  * function for getter sale.
  */
const KEY = 'LIST_SALE';
const TTL = 0.6 * 60;

export default ({ saleRepository, redis }: any) => {
  const all = async (params: any) => {
    try {

      const cachingListSale = await redis.get(KEY);

      if (cachingListSale) return cachingListSale;

      const saleList = saleRepository.getAll(params);

      await redis.set(KEY, JSON.stringify(saleList), TTL);

      return saleList;

    } catch (error: unknown) {
      throw new Error(error as string | undefined);
    }
  };

  return {
    all
  };
};
