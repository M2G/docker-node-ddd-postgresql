/*eslint-disable*/
// @ts-ignore
import { attributes } from 'structure';

const OrderStatus = attributes({
  order_status_id: String,
  update_at: Number,
  sale_id: String,
  status_name_id: Number,
})(class OrderStatus {});

export default OrderStatus;

