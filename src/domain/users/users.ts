/*eslint-disable*/
// @ts-ignore
import { attributes } from 'structure';

const Users = attributes({
  user_id: Number,
  name: String,
})(class Product {});

export default Users;

