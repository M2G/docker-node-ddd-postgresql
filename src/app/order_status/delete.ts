/*eslint-disable*/
/**
  * function for delete order status.
  */
export default ({ orderStatusRepository }: any) => {
  const remove = ({ order_status_id }: any) =>
    Promise.resolve()
      .then(() =>
        orderStatusRepository.update({
          isDeleted: 1
        }, {
          where: { order_status_id }
        })
      )
      .catch((error) => {
        throw new Error(error);
      })

  return {
    remove
  }
}
