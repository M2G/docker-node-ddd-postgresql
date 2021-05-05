/*eslint-disable*/
/**
  * function for getter country.
  */
export default ({ countryRepository }: any) => {
  const all = () =>
     Promise
      .resolve()
      .then(() =>
        countryRepository.getAll({
          attributes: [
            'country_id', 'country_name'
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
