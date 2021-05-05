/*eslint-disable*/
/**
  * function for getter country.
  */
export default ({ countryRepository }: any) => {
  const one = ({ country_id }: any) =>
     Promise
      .resolve()
      .then(() =>
        countryRepository.findById({
          attributes: [
            'country_id', 'country_name'
          ],
          where: { country_id }
        })
      )
      .catch(error => {
        throw new Error(error);
      });

  return {
    one
  }
}
