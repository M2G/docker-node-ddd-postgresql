import t from 'tcomb';

const Country = t.struct({
  country_id: t.Number,
  country_name: t.String
});

export default Country;
