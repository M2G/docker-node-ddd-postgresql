/*eslint-disable*/
import Sale from 'domain/sale';

/**
  * function for getter post.
  */
export default ({ saleRepository }: any) => {
  const remove = ({ id }: number | any) => {
    try {
      const { sale_id }: any = Sale({ sale_id: id });
      return saleRepository.destroy({ where: { sale_id } });
    } catch (error) {
      throw new Error(error);
    }
  }

  return {
    remove
  }
}
