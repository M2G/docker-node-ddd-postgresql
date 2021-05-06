/*eslint-disable*/
// @ts-ignore
import { attributes } from 'structure';

const Store = attributes({
  store_id: Number,
  name: String,
  city_id: Number,
})(class Product {});

export default Store;

