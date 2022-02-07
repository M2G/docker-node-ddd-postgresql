/*eslint-disable*/
import Sale from 'domain/sale';

/**
  * function for getter post.
  */
export default ({ saleRepository }: any) => {
  const one = ({ id }: any) => {
    try {
      const { sale_id }: any = Sale({ sale_id: id });
      return saleRepository.findById({ sale_id });
    } catch (error) {
      throw new Error(error);
    }
  }

  return {
    one
  }
}
