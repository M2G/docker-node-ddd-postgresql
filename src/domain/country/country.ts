/*eslint-disable*/
// @ts-ignore
import { attributes } from 'structure';

const Country = attributes({
  country_id: Number,
  country_name: String,
})(class Product {});

export default Country;

