import t from 'tcomb';
import {compose} from 'ramda';

const Product = t.struct({
  name: t.maybe(t.String),
  product_id: t.maybe(t.Number)
});

export default compose(Product);
