import t from 'tcomb';

const Product = t.struct({
  product_id: t.maybe(t.Number),
  product_name: t.maybe(t.String)
});

export default Product;
