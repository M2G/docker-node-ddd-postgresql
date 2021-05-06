/*eslint-disable*/
/**
  * function for delete city.
  */
export default ({ cityRepository }: any) => {
  // code for getting all the items
  const remove = ({ city_id }: any) =>
    Promise
      .resolve()
      .then(() =>
        cityRepository.update({
          isDeleted: 1
        }, {
          where: { city_id }
        })
      )
      .catch((error) => {
        throw new Error(error);
      })

  return {
    remove
  }
}
