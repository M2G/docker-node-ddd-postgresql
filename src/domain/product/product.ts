import t from 'tcomb';

const Product = t.struct({
  name: t.String,
  product_id: t.Number
});

export default Product;
