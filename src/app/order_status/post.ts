/*eslint-disable*/
/**
 * this file will hold all the get use-case for order status domain
 */
import OrderStatus from '../../domain/order_status';

/**
  * function for create order_status.
  */
export default ({ postRepository }: any) => {
  const create = ({ body }: any) =>
    Promise.resolve()
      .then(() => {
        const order_status = new OrderStatus(body);
        return postRepository.create(order_status);
      })
      .catch((error) => {
        throw new Error(error);
      });

  return {
    create
  }
}
