/*eslint-disable*/
/**
  * function for get user.
  */

import User from 'domain/users';
import { cleanData } from 'interfaces/http/utils';

export default ({ usersRepository }: any) => {
  const one = async ({ id }: any) => {

    try {
      const user = User({ user_id: +id });
      return await usersRepository.findById(cleanData(user));
    } catch (error) {
      throw new Error(error);
    }
  }

  return {
    one
  }
}
