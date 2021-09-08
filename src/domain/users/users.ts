import t from 'tcomb';
import {compose} from 'ramda';

const Users = t.struct({
  name: t.String,
  user_id: t.Number
});

export default compose(Users);
