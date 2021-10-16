import t from 'tcomb';

const OrderStatus = t.struct({
  order_status_id: t.String,
  sale_id: t.String,
  status_name_id: t.Number,
  update_at: t.Number
});

export default OrderStatus;
