/*eslint-disable*/
/**
 * this file will hold all the get use-case for store domain
 */
import Store from '../../domain/store';

/**
  * function for create store.
  */
export default ({ storeRepository }: any) => {
  const create = ({ body }: any) =>
    Promise
      .resolve()
      .then(() => {
        const store = new Store(body);
        return storeRepository.create(store);
      })
      .catch((error) => {
        throw new Error(error);
      });

  return {
    create
  }
}
