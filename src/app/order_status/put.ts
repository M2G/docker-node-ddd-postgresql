/*eslint-disable*/
/**
 * this file will hold all the get use-case for order_status domain
 */
import OrderStatus from '../../domain/order_status';

/**
  * function for update order_status.
  */
export default ({ postRepository }: any) => {
  const update = ({ order_status_id, body }: any) =>
    new Promise(async (resolve, reject) => {
      try {
        const order_status = new OrderStatus(body);
        await postRepository.update(order_status, {
          where: { order_status_id }
        })
        return resolve(order_status);
      } catch (error) {
        return reject(error);
      }
    });

  return {
    update
  }
}
