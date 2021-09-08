import t from 'tcomb';
import {compose} from 'ramda';

const City = t.struct({
  city_id: t.Number,
  city_name: t.String,
  country_id: t.Number
});

export default compose(City);
