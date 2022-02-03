/*eslint-disable*/
/**
  * function for getter city.
  */

const KEY = 'LIST_CITY';
const TTL = 0.6 * 60;

export default ({ cityRepository, redis }: any) => {
  const all = async (params: any) => {
    try {

      const cachingListCity = await redis.get(KEY);

      if (cachingListCity) return cachingListCity;

      const cityList = cityRepository.getAll(params);

      await redis.set(KEY, JSON.stringify(cityList), TTL);

      return cityList;

    } catch (error: unknown) {
      throw new Error(error as string | undefined);
    }
  };

  return {
    all
  };
};

