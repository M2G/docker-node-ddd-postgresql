/*eslint-disable*/
/**
  * function for get order status.
  */
export default ({ orderStatusRepository }: any) => {
  const all = () =>
     Promise.resolve()
      .then(() =>
        orderStatusRepository.getAll({
          attributes: [
            'order_status_id', 'update_at', 'sale_id', 'status_name_id'
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
