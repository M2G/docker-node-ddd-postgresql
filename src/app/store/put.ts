/*eslint-disable*/
/**
 * this file will hold all the get use-case for store domain
 */
import Store from 'domain/store';
import { cleanData } from 'interfaces/http/utils';

/**
  * function for update store.
  */
export default ({ postRepository }: any) => {
  const update = ({ id, ...args }: any) => {
    try {
      const store = Store(args);
      return postRepository.update(cleanData(store), {
        where: { store_id: id },
        returning: true,
        plain: true
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  return {
    update
  }
}
