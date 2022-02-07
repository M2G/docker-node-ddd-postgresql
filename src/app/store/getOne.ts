/*eslint-disable*/
import Store from 'domain/store';

/**
  * function for getter store.
  */
export default ({ storeRepository }: any) => {
  const one = ({ id }: any) => {
    try {
      const { store_id }: any = Store({ store_id: +id });
      return storeRepository.findById({ store_id });
    } catch (error) {
      throw new Error(error);
    }
  };

  return {
    one
  }
}
