/*eslint-disable*/
/**
  * function for delete store.
  */
export default ({ storeRepository }: any) => {
  const remove = ({ store_id }: any) =>
    Promise.resolve()
      .then(() =>
        storeRepository.update({
          isDeleted: 1
        }, {
          where: { store_id }
        })
      )
      .catch((error) => {
        throw new Error(error);
      })

  return {
    remove
  }
}
