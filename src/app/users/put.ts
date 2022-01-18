/*eslint-disable*/
/**
 * this file will hold all the get use-case for users domain
 */
import Users from '../../domain/users';
import { cleanData } from 'interfaces/http/utils';

export default ({ usersRepository }: any) => {
  const update = async ({ user_id, body }: any) => {

    try {
      const user = new Users(body);
      return await usersRepository.update(cleanData(user), { where: { user_id } });
    } catch (error) {
      throw new Error(error);
    }
  }

  return {
    update
  }
}
