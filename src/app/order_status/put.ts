/*eslint-disable*/
/**
 * this file will hold all the get use-case for order_status domain
 */
import OrderStatus from 'domain/order_status';
import { cleanData } from 'interfaces/http/utils';

/**
  * function for update order_status.
  */
export default ({ orderStatusRepository }: any) => {
  const update = ({ id, ...args }: any) => {
    try {
      const orderStatus = OrderStatus(args);
      return orderStatusRepository.update(cleanData(orderStatus), {
        where: { order_status_id: id },
        returning: true,
        plain: true
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  return {
    update
  }
}
