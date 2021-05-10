/*eslint-disable*/
// @ts-ignore
import { attributes } from 'structure';

const Token = attributes({
  email: String,
  password: String,
})(class Token {});

export default Token;

