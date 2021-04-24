/* eslint-disable */
// import t from 'tcomb';
// @ts-ignore
import { attributes } from 'structure';

const Post = attributes({
  id: Number,
  title: String,
  content: String,
  // createdAt: t.maybe(t.Date),
  // updatedAt: t.maybe(t.Date)
})(class Post {});

export default Post;

