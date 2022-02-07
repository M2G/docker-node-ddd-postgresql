/*eslint-disable*/
import Store from 'domain/store';

/**
  * function for delete store.
  */
export default ({ storeRepository }: any) => {
  const remove = ({ id }: number | any) => {
    try {
      const { store_id }: any = Store({ store_id: +id });
      return storeRepository.destroy({ where: { store_id } });
    } catch (error) {
      throw new Error(error);
    }
  }

  return {
    remove
  }
}
