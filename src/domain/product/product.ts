/*eslint-disable*/
// @ts-ignore
import { attributes } from 'structure';

const Product = attributes({
  name: String,
  product_id: Number,
})(class Product {});

export default Product;

