import t from 'tcomb';
import {compose} from 'ramda';

const Token = t.struct({
  email: t.Number,
  password: t.String
});

export default compose(Token);
