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
  const create = ({ ...args }: any) => {
    try {
      const sale = Sale(args);
      return saleRepository.create(cleanData(sale));
    } catch (error: any) {
      throw new Error(error);
    }
  };

  return {
    create,
  };
};
