/*eslint-disable*/
/**
  * function for delete users.
  */
export default ({ usersRepository }: any) => {
  const remove = ({ user_id }: any) =>
    Promise
      .resolve()
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
  }
}
