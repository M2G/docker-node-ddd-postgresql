import t from 'tcomb';

const Users = t.struct({
  created_by: t.maybe(t.Number),
  email: t.maybe(t.String),
  first_name: t.maybe(t.String),
  is_deleted: t.maybe(t.Number),
  is_verified: t.maybe(t.Number),
  last_name: t.maybe(t.String),
  name: t.maybe(t.String),
  password: t.maybe(t.String),
  role_id: t.maybe(t.Number),
  updated_by: t.maybe(t.Number),
  user_id: t.maybe(t.Number),
  verification_code: t.maybe(t.String)
});

export default Users;
