/*eslint-disable*/
/**
 * this file will hold all the get use-case for store domain
 */
import Store from '../../domain/store';

/**
  * function for update store.
  */
export default ({ postRepository }: any) => {
  // code for getting all the items
  const update = ({ store_id, body }: any) =>
    new Promise(async (resolve, reject) => {
      try {
        const store = new Store(body);
        await postRepository.update(store, {
          where: { store_id }
        })
        resolve(store);
      } catch (error) {
        reject(error);
      }
    });

  return {
    update
  }
}
