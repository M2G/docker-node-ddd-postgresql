import t from 'tcomb';

const Store = t.struct({
  city_id: t.Number,
  name: t.String,
  store_id: t.Number
});

export default Store;
