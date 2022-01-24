/*eslint-disable*/
const KEY = 'LIST_STATUS_NAME';
const TTL = 0.6 * 60;

/**
  * function for get all status name.
  */
export default ({ redis, statusNameRepository }: any) => {
  const all = async (params: any) => {
    try {
      const cachingListStatusName = await redis.get(KEY);

      if (cachingListStatusName) return cachingListStatusName;

      const statusNameList =  statusNameRepository.getAll(params);

      await redis.set(KEY, JSON.stringify(statusNameList), TTL);

      return statusNameList;
    } catch (error) {
      throw new Error(error);
    }
  }

  return {
    all
  }
}
