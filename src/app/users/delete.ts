/*eslint-disable*/
/**
 * function for delete users.
 */
export default ({ usersRepository }: any) => {
  const remove = ({ id }: any) => {
    try {
      return usersRepository.destroy({ where: { id } });
    } catch (error) {
      throw new Error(error);
    }
  };

  return {
    remove,
  };
  /*const remove = ({ user_id }: any) =>
    Promise.resolve()
      .then(() =>
        usersRepository.update({
          isDeleted: 1
        }, {
          where: { user_id }
        })
      )
      .catch((error) => {
        throw new Error(error);
      })

  return {
    remove
  }*/
}
