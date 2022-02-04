/*eslint-disable*/
/**
 * this file will hold all the get use-case for status name domain
 */
import StatusName from 'domain/status_name';
import { cleanData } from 'interfaces/http/utils';

/**
  * function for create status name.
  */
export default ({ statusNameRepository }: any) => {
  const create = ({ ...args }: any) => {
    try {
      const statusName = StatusName(args);
      return statusNameRepository.create(cleanData(statusName));
    } catch (error) {
      throw new Error(error);
    }
  }

  return {
    create
  }
}
