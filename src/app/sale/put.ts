/*eslint-disable*/
/**
 * this file will hold all the get use-case for sale domain
 */
import Sale from 'domain/sale';
import { cleanData } from 'interfaces/http/utils';

/**
 * function for getter sale.
 */
export default ({ saleRepository }: any) => {
  const update = ({ id, ...args }: any) => {
    try {
      const sale = Sale(args);
      return saleRepository.update(cleanData(sale), {
        where: { sale_id: id },
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
