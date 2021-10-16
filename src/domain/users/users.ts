import t from 'tcomb';

const Users = t.struct({
  name: t.String,
  user_id: t.Number
});

export default Users;
