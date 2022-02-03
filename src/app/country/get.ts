/*eslint-disable*/
/**
  * function for getter country.
  */
const KEY = 'LIST_COUNTRY';
const TTL = 0.6 * 60;

export default ({ countryRepository, redis }: any) => {
  const all = async (params: any) => {
    try {

      const cachingListCountry = await redis.get(KEY);

      if (cachingListCountry) return cachingListCountry;

      const countryList = countryRepository.getAll(params);

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

