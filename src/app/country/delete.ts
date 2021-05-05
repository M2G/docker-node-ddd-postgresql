/*eslint-disable*/
/**
  * function for getter country.
  */
export default ({ countryRepository }: any) => {
  const remove = ({ id }: any) =>
    Promise
      .resolve()
      .then(() =>
        countryRepository.update({
          isDeleted: 1
        }, {
          where: { id }
        })
      )
      .catch((error) => {
        throw new Error(error);
      })

  return {
    remove
  }
}
