import t from 'tcomb';
import {compose} from 'ramda';

const Country = t.struct({
  country_id: t.Number,
  country_name: t.String
});

export default compose(Country);
