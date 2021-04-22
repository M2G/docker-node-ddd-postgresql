import t from 'tcomb';
import { compose } from 'ramda';
import cleanData from '../helper';

const Post = t.struct({
  id: t.maybe(t.Integer),
  title: t.String,
  content: t.String,
  // createdAt: t.maybe(t.Date),
  // updatedAt: t.maybe(t.Date)
})

export default compose(
  cleanData,
  Post
)
