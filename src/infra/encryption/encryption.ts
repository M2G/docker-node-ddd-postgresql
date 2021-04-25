/*eslint-disable*/
import bcrypt from 'bcrypt';

const encryptPassword = (password: any) => {
  const salt = bcrypt.genSaltSync()
  return bcrypt.hashSync(password, salt)
}

const comparePassword = (password: any, encodedPassword: any) => {
  return bcrypt.compareSync(password, encodedPassword)
}

export default {
  encryptPassword,
  comparePassword
}
