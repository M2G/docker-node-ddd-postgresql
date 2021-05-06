/*eslint-disable*/
/**
 * this file will hold all the get use-case for users domain
 */
import Users from '../../domain/users';

/**
  * function for update user.
  */
export default ({ usersRepository }: any) => {
  // code for getting all the items
  const update = ({ user_id, body }: any) =>
    new Promise(async (resolve, reject) => {
      try {
        const user = new Users(body);
        await usersRepository.update(user, {
          where: { user_id }
        })
        resolve(user);
      } catch (error) {
        reject(error);
      }
    });

  return {
    update
  }
}
