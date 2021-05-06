/*eslint-disable*/
/**
  * function for getter post.
  */
export default ({ cityRepository }: any) => {
  const one = ({ city_id }: any) =>
     Promise
      .resolve()
      .then(() =>
        cityRepository.findById({
          attributes: [
            'city_id', 'city_name', 'country_id'
          ],
          where: { city_id }
        })
      )
      .catch(error => {
        throw new Error(error);
      });

  return {
    one
  }
}
