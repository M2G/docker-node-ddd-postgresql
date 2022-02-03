/*eslint-disable*/
/**
  * function for get order order_status.
  */
const KEY = 'LIST_ORDER_STATUS';
const TTL = 0.6 * 60;

export default ({ orderStatusRepository, redis }: any) => {
  const all = async (params: any) => {
    try {

      const cachingListCountry = await redis.get(KEY);

      if (cachingListCountry) return cachingListCountry;

      const countryList = orderStatusRepository.getAll(params);

      await redis.set(KEY, JSON.stringify(countryList), TTL);

      return countryList;

    } catch (error: unknown) {
      throw new Error(error as string | undefined);
    }
  };

  return {
    all
  };
};
