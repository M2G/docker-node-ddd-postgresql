/*eslint-disable*/
/**
  * function for getter country.
  */
export default ({ countryRepository }: any) => {
  const remove = ({ country_id }: any) =>
    Promise.resolve()
      .then(() =>
        countryRepository.update({
          isDeleted: 1
        }, {
          where: { country_id }
        })
      )
      .catch((error) => {
        throw new Error(error);
      })

  return {
    remove
  }
}
