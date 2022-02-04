/*eslint-disable*/
import Store from 'domain/store';

/**
  * function for delete store.
  */
export default ({ storeRepository }: any) => {
  const remove = ({ id }: number | any) => {
    try {
      const { status_name_id }: any = Store({ status_name_id: +id });
      return storeRepository.destroy({ where: { status_name_id } });
    } catch (error) {
      throw new Error(error);
    }
  }

  return {
    remove
  }
}
