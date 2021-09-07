import t from 'tcomb';
import {compose} from 'ramda';

const City = t.struct({
  city_id: t.maybe(t.Number),
  city_name: t.maybe(t.String),
  country_id: t.maybe(t.Number)
});

export default compose(City);
