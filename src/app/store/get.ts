/*eslint-disable*/
/**
  * function for store store.
  */

const KEY = 'LIST_STORE';
const TTL = 0.6 * 60;

export default ({ storeRepository, redis }: any) => {
  const all = async (params: any) => {
    try {

      const cachingListStore = await redis.get(KEY);

      if (cachingListStore) return cachingListStore;

      const storeList = storeRepository.getAll(params);

      await redis.set(KEY, JSON.stringify(storeList), TTL);

      return storeList;

    } catch (error: unknown) {
      throw new Error(error as string | undefined);
    }
  };

  return {
    all
  };
};
