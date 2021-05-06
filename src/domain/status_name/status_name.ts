/*eslint-disable*/
// @ts-ignore
import { attributes } from 'structure';

const StatusName = attributes({
  status_name_id: Number,
  status_name: String
})(class Product {});

export default StatusName;

