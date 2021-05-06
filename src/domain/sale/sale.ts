/*eslint-disable*/
// @ts-ignore
import { attributes } from 'structure';

const Sale = attributes({
  sale_id: String,
  amount: Number,
  date_sale: Date,
  product_id: Number,
  user_id: Number,
  store_id: Number,
})(class Product {});

export default Sale;

