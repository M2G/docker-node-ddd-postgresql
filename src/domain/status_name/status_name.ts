import t from 'tcomb';
import {compose} from 'ramda';

const StatusName = t.struct({
  status_name: t.String,
  status_name_id: t.Number
});

export default compose(StatusName);
