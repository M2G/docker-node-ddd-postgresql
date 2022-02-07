import t from 'tcomb';

const Sale = t.struct({
  amount: t.maybe(t.Any),
  date_sale: t.maybe(t.Any),
  product_id: t.maybe(t.Number),
  sale_id: t.maybe(t.String),
  store_id: t.maybe(t.Number),
  user_id: t.maybe(t.Number)
});

export default Sale;
