/*eslint-disable*/
/**
 * this file will hold all the get use-case for sale domain
 */
import Sale from '../../domain/sale';

/**
  * function for getter sale.
  */
export default ({ saleRepository }: any) => {
  const update = ({ id, body }: any) =>
    new Promise(async (resolve, reject) => {
      try {
        const sale = new Sale(body);
        await saleRepository.update(sale, {
          where: { id }
        })
        resolve(sale);
      } catch (error) {
        reject(error);
      }
    });

  return {
    update
  }
}
