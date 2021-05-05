/*eslint-disable*/
// @ts-ignore
import { attributes } from 'structure';

const Product = attributes({
  product_id: Number,
  name: String
})(class Product {});

export default Product;

