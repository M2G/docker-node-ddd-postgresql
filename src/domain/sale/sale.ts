import t from 'tcomb';

const Sale = t.struct({
  amount: t.Number,
  date_sale: t.Date,
  product_id: t.Number,
  sale_id: t.String,
  store_id: t.Number,
  user_id: t.Number
});

export default Sale;
