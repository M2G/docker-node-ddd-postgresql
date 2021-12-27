/*eslint-disable*/
/**
  * function for get user.
  */
export default ({ usersRepository }: any) => {
  const one = ({ user_id }: any) => {

    try {
      return usersRepository.findById({
        attributes: [
          'user_id', 'name'
        ],
        where: { user_id }
      });
    } catch (error) {
      throw new Error(error);
    }

     /*Promise.resolve()
      .then(() =>
        usersRepository.findById({
          attributes: [
            'user_id', 'name'
          ],
          where: { user_id }
        })
      )
      .catch(error => {
        throw new Error(error);
      });*/
  }

  return {
    one
  }
}
