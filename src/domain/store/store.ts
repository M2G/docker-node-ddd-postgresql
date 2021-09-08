import t from 'tcomb';
import {compose} from 'ramda';

const Store = t.struct({
  city_id: t.Number,
  name: t.String,
  store_id: t.Number
});

export default compose(Store);
