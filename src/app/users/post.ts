/*eslint-disable*/
/**
 * this file will hold all the get use-case for user domain
 */
import Users from '../../domain/users';
import { cleanData } from 'interfaces/http/utils';
/**
 * function for create user.
 */
export default ({ usersRepository }: any) => {
  const create = ({ ...body }: any) => {
    try {
      const user = new Users(body);
      return usersRepository.create(cleanData(user));
    } catch (error: any) {
      throw new Error(error);
    }
  };

  return {
    create,
  };
};
