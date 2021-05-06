/*eslint-disable*/
/**
  * function for getter post.
  */
export default ({ cityRepository }: any) => {
  const all = () =>
     Promise
      .resolve()
      .then(() =>
        cityRepository.getAll({
          attributes: [
            'city_id', 'city_name', 'country_id'
          ]
        })
      )
      .catch(error => {
        throw new Error(error);
      });

  return {
    all
  }
}
