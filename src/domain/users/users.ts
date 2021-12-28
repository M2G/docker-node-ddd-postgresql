import t from 'tcomb';

const Users = t.struct({
  createdBy: t.String,
  email: t.String,
  firstName: t.String,
  isDeleted: t.Number,
  isVerified: t.Number,
  lastName: t.String,
  name: t.String,
  password: t.String,
  roleId: t.Number,
  updatedBy: t.String,
  user_id: t.Number,
  verificationCode: t.String
});

export default Users;
