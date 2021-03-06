/*eslint-disable*/
/**
 * this file will hold all the get use-case for store domain
 */
import Store from 'domain/store';
import { cleanData } from 'interfaces/http/utils';

/**
 * function for update store.
 */
export default ({ storeRepository }: any) => {
  const update = ({ id, ...args }: any) => {
    try {
      const store = Store(args);
      return storeRepository.update(cleanData(store), {
        where: { store_id: id },
        returning: true,
        plain: true,
      });
    } catch (error: any) {
      throw new Error(error);
    }
  };

  return {
    update,
  };
};
