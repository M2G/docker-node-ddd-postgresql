import t from 'tcomb';

const Token = t.struct({
  email: t.Number,
  password: t.String
});

export default Token;
