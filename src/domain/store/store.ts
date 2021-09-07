import t from 'tcomb';
import {compose} from 'ramda';

const Store = t.struct({
  city_id: t.maybe(t.Number),
  name: t.maybe(t.String),
  store_id: t.maybe(t.Number)
});

export default compose(Store);
