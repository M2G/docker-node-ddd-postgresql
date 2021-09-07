import t from 'tcomb';
import {compose} from 'ramda';

const OrderStatus = t.struct({
  order_status_id: t.maybe(t.String),
  sale_id: t.maybe(t.String),
  status_name_id: t.maybe(t.Number),
  update_at: t.maybe(t.Number)
});

export default compose(OrderStatus);
