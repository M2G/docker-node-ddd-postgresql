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
  const create = ({ body }: any) => {
    try {
      const status = StatusName({ ...body });
      return statusNameRepository.create(cleanData(status));
    } catch (error) {
      throw new Error(error);
    }
  }
  return {
    create
  }
}
