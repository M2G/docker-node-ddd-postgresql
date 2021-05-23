/*eslint-disable*/
/**
  * function for get order status.
  */
export default ({ orderStatusRepository }: any) => {
  const one = ({ order_status_id }: any) =>
     Promise.resolve()
      .then(() =>
        orderStatusRepository.findById({
          attributes: [
            'order_status_id', 'update_at', 'sale_id', 'status_name_id'
          ],
          where: { order_status_id }
        })
      )
      .catch(error => {
        throw new Error(error);
      });

  return {
    one
  }
}
