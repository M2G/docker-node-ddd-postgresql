/*eslint-disable*/
import Users from 'domain/users';

/**
 * function for delete users.
 */
export default ({ usersRepository }: any) => {
  const remove = ({ id }: number | any) => {
    try {
      const { user_id }: any = Users({ user_id: +id });
      return usersRepository.destroy({ where: { user_id } });
    } catch (error: any) {
      throw new Error(error);
    }
  };

  return {
    remove,
  };
};
