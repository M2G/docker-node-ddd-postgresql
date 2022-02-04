/*eslint-disable*/
/**
 * this file will hold all the get use-case for users domain
 */
import Users from 'domain/users';
import { cleanData } from 'interfaces/http/utils';

export default ({ usersRepository }: any) => {
  const update = ({ id, ...args }: any) => {
    try {
      const user = Users(args);
      return usersRepository.update(cleanData(user), {
        where: { user_id: id },
        returning: true,
        plain: true
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  return {
    update
  }
}
