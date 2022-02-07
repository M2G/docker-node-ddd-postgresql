/*eslint-disable*/
import OrderStatus from 'domain/order_status';

/**
  * function for delete order status.
  */
export default ({ orderStatusRepository }: any) => {
  const remove = ({ id }: number | any) => {
    try {
      const { order_status_id }: any = OrderStatus({ order_status_id: id });
      return orderStatusRepository.destroy({ where: { order_status_id } });
    } catch (error) {
      throw new Error(error);
    }
  }

  return {
    remove
  }
}
