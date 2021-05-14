/*eslint-disable*/
// @ts-ignore
import { attributes } from 'structure';

const City = attributes({
  city_id: Number,
  city_name: String,
  country_id: Number,
})(class City {});

export default City;

