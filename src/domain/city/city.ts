import t from 'tcomb';

const City = t.struct({
  city_id: t.Number,
  city_name: t.String,
  country_id: t.Number
});

export default City;
