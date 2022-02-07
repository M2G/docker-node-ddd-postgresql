import t from 'tcomb';

const Country = t.struct({
  country_id: t.maybe(t.Number),
  country_name: t.maybe(t.String)
});

export default Country;
