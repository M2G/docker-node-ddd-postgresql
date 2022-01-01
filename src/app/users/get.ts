/*eslint-disable*/
/**
  * function for get users.
  */
export default ({ usersRepository }: any) => {

  const all = () => {
    try {
      return usersRepository.getAll({
        attributes: [
          'user_id',
          'first_name',
          'last_name',
          'email',
          'password',
          'role_id',
          'verification_code',
          'is_verified',
          'is_deleted',
          'created_by',
          'updated_by',
        ]
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  return {
    all
  }
  /*const all = () =>
     Promise.resolve()
      .then(() =>
        usersRepository.getAll({
          attributes: [
            'user_id',
            'name',
            "firstName",
            "lastName",
            "email",
            "password",
            "roleId"
          ]
        })
      )
      .catch(error => {
        throw new Error(error);
      });

  return {
    all
  }*/
}
