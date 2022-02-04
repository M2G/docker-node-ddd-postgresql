/*eslint-disable*/
/**
 * this file will hold all the get use-case for order status domain
 */
import OrderStatus from 'domain/order_status';
import { cleanData } from 'interfaces/http/utils';

/**
  * function for create order_status.
  */
export default ({ orderStatusRepository }: any) => {
  const create = ({ ...args }: any) => {
    try {
      const orderStatus = OrderStatus(args);
      return orderStatusRepository.create(cleanData(orderStatus));
    } catch (error) {
      throw new Error(error);
    }
  }

  return {
    create
  }
}
