/*eslint-disable*/
/**
  * function for get user.
  */

import User from 'domain/users';

export default ({ usersRepository }: any) => {
  const one = async ({ id }: any) => {

    try {
      const user = User({ user_id: +id });
      return await usersRepository.findById(user);
    } catch (error) {
      throw new Error(error);
    }
  }

  return {
    one
  }
}
