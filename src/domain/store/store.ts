import t from 'tcomb';

const Store = t.struct({
  city_id: t.maybe(t.Number),
  store_id: t.maybe(t.Number),
  store_name: t.maybe(t.String)
});

export default Store;
