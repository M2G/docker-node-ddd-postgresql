import t from 'tcomb';
import {compose} from 'ramda';

const Product = t.struct({
  name: t.String,
  product_id: t.Number
});

export default compose(Product);
