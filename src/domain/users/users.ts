import t from 'tcomb';

const Users = t.struct({
  created_by: t.String,
  email: t.String,
  first_name: t.String,
  is_deleted: t.Number,
  is_verified: t.Number,
  last_name: t.String,
  name: t.String,
  password: t.String,
  role_id: t.Number,
  updated_by: t.String,
  user_id: t.Number,
  verification_code: t.String
});

export default Users;
