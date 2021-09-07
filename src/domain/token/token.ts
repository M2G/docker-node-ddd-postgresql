import t from 'tcomb';
import {compose} from 'ramda';

const Token = t.struct({
  email: t.maybe(t.Number),
  password: t.maybe(t.String)
});

export default compose(Token);
