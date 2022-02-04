/*eslint-disable*/
/**
 * this file will hold all the get use-case for store domain
 */
import Store from 'domain/store';
import { cleanData } from 'interfaces/http/utils';

/**
  * function for create store.
  */
export default ({ storeRepository }: any) => {
  const create = ({ ...args }: any) => {
    try {
      const statusName = Store(args);
      return storeRepository.create(cleanData(statusName));
    } catch (error) {
      throw new Error(error);
    }
  }

  return {
    create
  }
}
