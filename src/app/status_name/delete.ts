/*eslint-disable*/
/**
  * function for delete status name.
  */
export default ({ statusNameRepository }: any) => {
  const remove = ({ status_name_id }: any) =>
    Promise.resolve()
      .then(() =>
        statusNameRepository.update({
          isDeleted: 1
        }, {
          where: { status_name_id }
        })
      )
      .catch((error) => {
        throw new Error(error);
      })

  return {
    remove
  }
}
