/*eslint-disable*/
/**
  * function for get users.
  */
const KEY = 'LIST_USER';
const TTL = 0.6 * 60;

export default ({ usersRepository, redis }: any) => {
  const all = async (params: any) => {
    try {

      const cachingListUser = await redis.get(KEY);

      if (cachingListUser) return cachingListUser;

      const userList = usersRepository.getAll(params);

      await redis.set(KEY, JSON.stringify(userList), TTL);

      return userList;

    } catch (error: unknown) {
      throw new Error(error as string | undefined);
    }
  };

  return {
    all
  };
};
