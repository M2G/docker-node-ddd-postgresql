import t from 'tcomb';
import {compose} from 'ramda';

const Sale = t.struct({
  amount: t.maybe(t.Number),
  date_sale: t.maybe(t.Date),
  product_id: t.maybe(t.Number),
  sale_id: t.maybe(t.String),
  store_id: t.maybe(t.Number),
  user_id: t.maybe(t.Number)
});

export default compose(Sale);
