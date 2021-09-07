import t from 'tcomb';
import {compose} from 'ramda';

const Users = t.struct({
  name: t.maybe(t.String),
  user_id: t.maybe(t.Number)
});

export default compose(Users);
