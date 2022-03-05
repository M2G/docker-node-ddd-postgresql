/*eslint-disable*/
import OrderStatus from 'domain/order_status';

/**
 * function for get one order status.
 */
export default ({ orderStatusRepository }: any) => {
  const one = ({ id }: any) => {
    try {
      const { order_status_id }: any = OrderStatus({
        order_status_id: id,
      });
      return orderStatusRepository.findById({
        where: { order_status_id },
      });
    } catch (error: any) {
      throw new Error(error);
    }
  };
  return {
    one,
  };
};
